/* Optional Rive Studio bridge. SVG Pro remains active until clara-studio.riv exists. */
export class RiveAvatarBridge {
  constructor(){this.instance=null;this.viewModel=null;this.ready=false}
  async mount({canvas,src='assets/rigs/clara-studio.riv',Rive}){
    if(!canvas||!Rive)return false;
    this.instance=new Rive({src,canvas,autoplay:true,stateMachines:'State Machine 1',autoBind:true,onLoad:()=>{this.ready=true;this.instance.resizeDrawingSurfaceToCanvas?.()}});
    return true
  }
  set(name,value){if(!this.ready||!this.viewModel)return;const property=this.viewModel.property?.(name);if(property)property.value=value}
  trigger(name){if(!this.ready||!this.viewModel)return;this.viewModel.trigger?.(name)}
  behavior(kind){this.set('speaking',kind==='speaking');this.set('listening',kind==='listening');this.set('thinking',kind==='thinking');if(['neutral','encourage','success','celebrate'].includes(kind))this.set('emotion',kind);if(kind==='success')this.trigger('thumbsUp')}
  viseme(value){this.set('viseme',value||'REST')}
  destroy(){this.instance?.cleanup?.();this.instance=null;this.viewModel=null;this.ready=false}
}
