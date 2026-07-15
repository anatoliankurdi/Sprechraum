#!/usr/bin/env node

/**
 * Builds the two translation packs used by the card back. The script is
 * resumable: existing entries are kept and both JSON files are checkpointed
 * after every successful batch.
 */
import {readFile, writeFile} from 'node:fs/promises';

const root=new URL('../',import.meta.url);
const cards=JSON.parse(await readFile(new URL('data/goethe-b1-words.json',root),'utf8'));
const trUrl=new URL('data/goethe-b1-translations-tr.json',root);
const enUrl=new URL('data/goethe-b1-translations-en.json',root);
const readJson=async url=>{try{return JSON.parse(await readFile(url,'utf8'))}catch{return {}}};
const tr=await readJson(trUrl),en=await readJson(enUrl);
const model=process.env.OLLAMA_MODEL||'gemma3:4b-it-qat';
const batchSize=Math.max(1,Number(process.env.BATCH_SIZE)||16);
const limit=Math.max(0,Number(process.env.LIMIT)||0);
const allMissing=cards.filter(card=>!tr[card.id]||!en[card.id]);
const missing=limit?allMissing.slice(0,limit):allMissing;

const save=async()=>Promise.all([
  writeFile(trUrl,`${JSON.stringify(tr,null,2)}\n`),
  writeFile(enUrl,`${JSON.stringify(en,null,2)}\n`)
]);

function extractJson(value){
  const text=String(value||'').replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'').trim();
  try{return JSON.parse(text)}catch{}
  const start=text.indexOf('['),end=text.lastIndexOf(']');
  if(start>=0&&end>start)return JSON.parse(text.slice(start,end+1));
  throw new Error('Model did not return a JSON array');
}

async function translate(batch){
  const source=batch.map(({id,word,forms,example})=>({id,word,forms,example}));
  const prompt=`Translate these German B1 vocabulary cards into natural Turkish and English. Use the example sentence to choose the correct contextual meaning. Preserve names, numbers and tone. Return every input item once and in the same order inside the translations array. Do not omit an item.\n\n${JSON.stringify(source)}`;
  const item={type:'object',properties:{id:{type:'string'},trMeaning:{type:'string'},trExample:{type:'string'},enMeaning:{type:'string'},enExample:{type:'string'}},required:['id','trMeaning','trExample','enMeaning','enExample']};
  const format={type:'object',properties:{translations:{type:'array',items:item}},required:['translations']};
  const response=await fetch('http://127.0.0.1:11434/api/chat',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({model,stream:false,format,messages:[{role:'user',content:prompt}],options:{temperature:.05,num_ctx:4096,num_predict:1800},keep_alive:'20m'})});
  if(!response.ok)throw new Error(`Ollama ${response.status}`);
  const body=await response.json();
  const parsed=extractJson(body.message?.content);
  const result=Array.isArray(parsed)?parsed:parsed?.translations||Object.values(parsed||{}).find(Array.isArray);
  if(!Array.isArray(result)||result.length!==batch.length)throw new Error(`Expected ${batch.length} results, received ${result?.length}`);
  const byId=new Map(result.map(item=>[item.id,item]));
  return batch.map(card=>{
    const item=byId.get(card.id);
    if(!item?.trMeaning||!item?.trExample||!item?.enMeaning||!item?.enExample)throw new Error(`Incomplete result for ${card.id}`);
    return item;
  });
}

console.log(`Model: ${model}. Processing ${missing.length} of ${allMissing.length} missing cards.`);
for(let offset=0;offset<missing.length;offset+=batchSize){
  let batch=missing.slice(offset,offset+batchSize),result;
  try{result=await translate(batch)}catch(error){
    console.warn(`Batch failed (${error.message}); retrying in smaller groups.`);
    result=[];
    for(const card of batch){
      try{result.push(...await translate([card]))}
      catch(inner){console.error(`Skipped ${card.id}: ${inner.message}`)}
    }
  }
  for(const item of result){
    tr[item.id]=[item.trMeaning.trim(),item.trExample.trim()];
    en[item.id]=[item.enMeaning.trim(),item.enExample.trim()];
  }
  await save();
  console.log(`${Object.keys(tr).length}/${cards.length} cards saved.`);
}
await save();
console.log(`Done. Turkish: ${Object.keys(tr).length}; English: ${Object.keys(en).length}.`);
