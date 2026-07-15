#!/usr/bin/env python3
"""Extract reusable flashcard data from the supplied Goethe B1 word-list PDF."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import unicodedata
from pathlib import Path

import pdfplumber


ARTICLE_RE = re.compile(r"\b(der|die|das)\s+([A-ZÄÖÜ][\wÄÖÜäöüß()/-]*)")
GROUP_SECTIONS = [
    (8, "Abkürzungen", "das Abo|der Akku|der Azubi|bzw.|ca.|d. h.|die DVD|das EG|das OG|das UG|etc.|der ICE|das Kfz|der Lkw|der PC|der Pkw|die SMS|das TV|usw.|vgl.|das WC|die WG|z. B."),
    (8, "Anglizismen", "das Baby|der Babysitter|die Babysitterin|die Band|die Bar|der Bikini|der Blog|bloggen|das Camp|campen|die Castingshow|der CD-Player|der Chatroom|chatten|checken|der Chip|die City|der Club|die Cola|der Comic|der Computer|cool|das E-Bike|das E-Book|der Fan|das Fax|faxen|das Festival|fit|die Fitness|global|googeln|der Hamburger|der Hit|die Homepage|das Internet|der Jazz|der Job|jobben|joggen|der Ketchup|der Killer|die Killerin|der Laptop|der Link|live|die E-Mail|die Mailbox|mailen|der Manager|die Managerin|die Mobilbox|das Mountainbike|okay|online|die Plattform|das Poster|das Puzzle|das Sandwich|die Show|das Smartphone|der Snack|die Software|der Song|der Spot|das Steak|surfen|der Swimmingpool|das Taxi|das Team|der Terminal|die Tour|der Trend|das T-Shirt|twittern|der User|die Userin"),
    (10, "Bildungseinrichtungen", "die Krippe|der Kindergarten|die Kindertagesstätte|die Kita|die Grundschule|die Mittelschule|die Realschule|die Gesamtschule|die Berufsschule|die Sonderschule|das Gymnasium|die Fachhochschule|die Hochschule|die Universität|die Uni|die Volkshochschule|die Volksschule|die Hauptschule|die Neue Mittelschule|die AHS|die BHS|die Akademie|die Pädagogische Hochschule|die Spielgruppe|die Primarschule|die Sekundarschule|die Bezirksschule|die Orientierungsstufe|die Berufsmittelschule|die Diplommittelschule"),
    (10, "Schulfächer", "Biologie|Chemie|Geografie|Geschichte|Mathematik|Mathe|Musik|Philosophie|Physik|Sport"),
    (11, "Schulnoten", "sehr gut|gut|befriedigend|ausreichend|mangelhaft|ungenügend|genügend|nicht genügend|schlecht|sehr schlecht|die Eins|die Zwei|die Drei|die Vier|die Fünf|die Sechs|der Einser|der Zweier|der Dreier|der Vierer|der Fünfer|der Sechser"),
    (11, "Farben", "hell|dunkel|blau|braun|gelb|grau|grün|lila|orange|rosa|rot|schwarz|violett|weiß"),
    (11, "Himmelsrichtungen", "der Norden|der Osten|der Süden|der Westen|nördlich|östlich|südlich|westlich"),
    (12, "Länder und Sprachen", "Deutschland|der Deutsche|die Deutsche|deutsch|Deutsch|Europa|der Europäer|die Europäerin|europäisch|Österreich|der Österreicher|die Österreicherin|österreichisch|die Schweiz|der Schweizer|die Schweizerin|schweizerisch|Griechenland|der Grieche|die Griechin|griechisch|Griechisch|die Türkei|der Türke|die Türkin|türkisch|Türkisch|die Ukraine|der Ukrainer|die Ukrainerin|ukrainisch|Ukrainisch"),
    (12, "Politik", "der Bund|der Bundeskanzler|die Bundeskanzlerin|der Bundespräsident|die Bundespräsidentin|der Bürgermeister|die Bürgermeisterin|die Demokratie|demokratisch|die Europäische Union|die EU|die Gemeinde|konservativ|liberal|der Minister|die Ministerin|das Parlament|die Partei|die Regierung|der Staat|staatlich|das Bundesland|die Bundesrepublik Deutschland|der Bundestag|der Nationalrat|die Republik Österreich|der Ammann|die Ammännin|der Bundesrat|die Bundesrätin|die Schweizerische Eidgenossenschaft|der Kanton|der Regierungsrat|die Regierungsrätin|der Stadtpräsident|die Stadtpräsidentin|der Ständerat"),
    (13, "Tiere", "der Affe|der Bär|die Biene|der Elefant|die Ente|der Fisch|die Fliege|die Giraffe|der Hase|der Hund|das Insekt|die Katze|das Krokodil|die Kuh|der Löwe|die Maus|die Mücke|das Pferd|der Pinguin|das Schaf|die Schildkröte|die Schlange|das Schwein|der Vogel"),
    (13, "Währungen und Maße", "der Euro|der Cent|der Franken|der Rappen|der Meter|der Zentimeter|der Kilometer|der Quadratmeter|das Grad|das Prozent|der Liter|das Gramm|das Pfund|das Kilo|das Kilogramm|das Dekagramm|die Stunde"),
    (13, "Zahlen", "eins|zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn|elf|zwölf|dreizehn|vierzehn|fünfzehn|sechzehn|siebzehn|achtzehn|neunzehn|zwanzig|einundzwanzig|dreißig|vierzig|fünfzig|sechzig|siebzig|achtzig|neunzig|hundert|tausend|die Million|die Milliarde|erstens|zweitens|drittens|viertens|einmal|zweimal|dreimal|einfach|zweifach|doppelt|plus|minus|halb|das Drittel|das Viertel"),
    (14, "Feiertage", "Neujahr|Ostern|Pfingsten|Weihnachten|Silvester|der Nationalfeiertag"),
    (14, "Jahreszeiten", "der Frühling|das Frühjahr|der Sommer|der Herbst|der Winter"),
    (14, "Monate", "der Januar|der Jänner|der Februar|der Feber|der März|der April|der Mai|der Juni|der Juli|der August|der September|der Oktober|der November|der Dezember"),
    (14, "Tageszeiten", "der Tag|der Morgen|die Früh|der Vormittag|der Mittag|der Nachmittag|der Abend|die Nacht|die Mitternacht|täglich|tagsüber|morgens|vormittags|mittags|nachmittags|abends|nachts"),
    (15, "Wochentage", "der Wochentag|das Wochenende|der Montag|der Dienstag|der Mittwoch|der Donnerstag|der Freitag|der Samstag|der Sonnabend|der Sonntag|wochentags|werktags|montags|dienstags|mittwochs|donnerstags|freitags|samstags|sonnabends|sonntags"),
    (15, "Zeitangaben", "die Sekunde|die Minute|die Stunde|der Tag|die Woche|der Monat|das Jahr|das Jahrzehnt|das Jahrhundert|das Jahrtausend|stündlich|täglich|wöchentlich|monatlich|jährlich"),
]


def fix_joined_hyphens(text: str) -> str:
    return re.sub(r"([A-Za-zÄÖÜäöüß])-\s+([a-zäöüß])", r"\1\2", text)


def normalize_space(text: str) -> str:
    return re.sub(r"\s+", " ", fix_joined_hyphens(text)).strip()


def text_lines(page, x0: float, x1: float):
    words = [
        word
        for word in page.extract_words()
        if x0 - 1 <= word["x0"] < x1 and 65 < word["top"] < 790
    ]
    groups: list[tuple[list[dict], float]] = []
    for word in sorted(words, key=lambda item: (item["top"], item["x0"])):
        if groups and abs(groups[-1][1] - word["top"]) < 1.3:
            groups[-1][0].append(word)
        else:
            groups.append(([word], word["top"]))
    return [
        (
            top,
            " ".join(item["text"] for item in sorted(group, key=lambda item: item["x0"])),
        )
        for group, top in groups
    ]


def extract_column(page, page_number: int, base: int, head_end: int, example_start: int, end: int):
    heads = text_lines(page, base, head_end)
    examples = text_lines(page, example_start, end)
    starts = []
    for index, (top, text) in enumerate(heads):
        previous = heads[index - 1][0] if index else None
        if (previous is None or top - previous > 14.5) and not re.fullmatch(
            r"(?:\d+\.|[A-ZÄÖÜ])", text.strip()
        ):
            starts.append(top)
    rows = []
    for index, top in enumerate(starts):
        next_top = starts[index + 1] if index + 1 < len(starts) else 790
        forms = normalize_space(
            " ".join(
                text
                for line_top, text in heads
                if top - 1 <= line_top < next_top - 1 and not re.fullmatch(r"\d+\.", text.strip())
            )
        )
        example = normalize_space(
            " ".join(text for line_top, text in examples if top - 4 <= line_top < next_top - 4)
        )
        if forms and example:
            rows.append({"forms": forms, "example": example, "sourcePage": page_number, "category": "Alphabetisch"})
    return rows


def clean_word(forms: str) -> str:
    text = re.sub(r"\b\d+\.", " ", forms).replace("→", " ")
    text = normalize_space(text)
    article = ARTICLE_RE.search(text)
    if article:
        noun = re.sub(r"\d+.*$", "", article.group(2))
        return f"{article.group(1)} {noun}"
    text = re.sub(r"^\([^)]*\)\s*", "", text)
    word = text.split(",", 1)[0].strip()
    word = re.sub(r"\s+\(Pl\.\)$", "", word).strip(" -;/")
    word = re.sub(r"\d+\..*$", "", word).strip()
    word = re.sub(r"^(ab|an|auf|aus|ein|mit|nach|über|unter|ver|vor|weg|weiter|wieder|zu)\1", r"\1", word, flags=re.I)
    return word


def clean_example(text: str) -> str:
    text = normalize_space(text)
    text = re.sub(r"(?:^|\s)\d+\.\s*", " ", text)
    text = normalize_space(text)
    sentences = re.findall(r"[^.!?]+[.!?]", text)
    if sentences:
        return normalize_space(sentences[0])
    return text[:260].strip()


def word_key(word: str) -> str:
    return unicodedata.normalize("NFKC", word).casefold()


def base_word(word: str) -> str:
    return re.sub(r"^(?:der|die|das)\s+", "", word, flags=re.I).strip()


def generic_example(word: str, page: int) -> str:
    base = base_word(word)
    if page == 13:
        return f"Im Alltag begegnet mir oft das Wort „{base}“."
    if page in (14, 15):
        return f"Wir sprechen heute über „{base}“."
    return f"Das Wort „{base}“ gehört zum B1-Wortschatz."


def group_words(_pdf) -> list[dict]:
    """Capture the structured semantic word groups on PDF pages 8-15."""
    rows = []
    for page_number, category, packed_words in GROUP_SECTIONS:
        for word in packed_words.split("|"):
            rows.append(
                {
                    "forms": word,
                    "word": word,
                    "example": generic_example(word, page_number),
                    "sourcePage": page_number,
                    "category": category,
                }
            )
    return rows


def extract(pdf_path: Path):
    rows = []
    with pdfplumber.open(pdf_path) as pdf:
        rows.extend(group_words(pdf))
        for page_index in range(15, len(pdf.pages)):
            page = pdf.pages[page_index]
            rows.extend(extract_column(page, page_index + 1, 35, 130, 131, 304))
            rows.extend(extract_column(page, page_index + 1, 314, 415, 420, 590))

    cards = []
    seen = set()
    for row in rows:
        word = row.get("word") or clean_word(row["forms"])
        key = word_key(word)
        if len(word) < 2 or key in seen or re.fullmatch(r"(?:\d+\.|[A-ZÄÖÜ])", word):
            continue
        seen.add(key)
        example = clean_example(row["example"])
        if word == "übertreiben" and "übertr" not in example.casefold():
            example = "Man sollte es mit dem Sport nicht übertreiben."
        if len(example) < 4:
            example = generic_example(word, row["sourcePage"])
        digest = hashlib.sha1(key.encode("utf-8")).hexdigest()[:10]
        cards.append(
            {
                "id": f"goethe-{digest}",
                "word": word,
                "forms": normalize_space(row["forms"]),
                "example": example,
                "category": row["category"],
                "sourcePage": row["sourcePage"],
            }
        )
    cards.sort(key=lambda item: word_key(item["word"]))
    return cards


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    cards = extract(args.pdf)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(cards, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"Extracted {len(cards)} unique cards to {args.output}")


if __name__ == "__main__":
    main()
