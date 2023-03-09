type Kana = {
	vowel: {
		a: string;
		i: string;
		u: string;
		e: string;
		o: string;
	};
	k: {
		ka: string;
		ki: string;
		ku: string;
		ke: string;
		ko: string;
	};
	s: {
		sa: string;
		shi: string;
		su: string;
		se: string;
		so: string;
	};
	t: {
		ta: string;
		chi: string;
		tsu: string;
		te: string;
		to: string;
	};
	n: {
		na: string;
		ni: string;
		nu: string;
		ne: string;
		no: string;
	};
	h: {
		ha: string;
		hi: string;
		fu: string;
		he: string;
		ho: string;
	};
	m: {
		ma: string;
		mi: string;
		mu: string;
		me: string;
		mo: string;
	};
	r: {
		ra: string;
		ri: string;
		ru: string;
		re: string;
		ro: string;
	};
	y: {
		ya: string;
		yu: string;
		yo: string;
	};
	w: {
		wa: string;
		wo: string;
	};
	_n: {
		n: string;
	};
	g: {
		ga: string;
		gi: string;
		gu: string;
		ge: string;
		go: string;
	};
	z: {
		za: string;
		ji: string;
		zu: string;
		ze: string;
		zo: string;
	};
	d: {
		da: string;
		dzi: string;
		dzu: string;
		de: string;
		do: string;
	};
	b: {
		ba: string;
		bi: string;
		bu: string;
		be: string;
		bo: string;
	};
	p: {
		pa: string;
		pi: string;
		pu: string;
		pe: string;
		po: string;
	};
};
type Syllabary = 'hira' | 'kata';
type Library = { [key in Syllabary]: Kana };

const kana: Library = {
	hira: {
		vowel: {
			a: 'あ',
			i: 'い',
			u: 'う',
			e: 'え',
			o: 'お'
		},
		k: {
			ka: 'か',
			ki: 'き',
			ku: 'く',
			ke: 'け',
			ko: 'こ'
		},
		s: {
			sa: 'さ',
			shi: 'し',
			su: 'す',
			se: 'せ',
			so: 'そ'
		},
		t: {
			ta: 'た',
			chi: 'ち',
			tsu: 'つ',
			te: 'て',
			to: 'と'
		},
		n: {
			na: 'な',
			ni: 'に',
			nu: 'ぬ',
			ne: 'ね',
			no: 'の'
		},
		h: {
			ha: 'は',
			hi: 'ひ',
			fu: 'ふ',
			he: 'へ',
			ho: 'ほ'
		},
		m: {
			ma: 'ま',
			mi: 'み',
			mu: 'む',
			me: 'め',
			mo: 'も'
		},
		r: {
			ra: 'ら',
			ri: 'り',
			ru: 'る',
			re: 'れ',
			ro: 'ろ'
		},
		y: {
			ya: 'や',
			yu: 'い',
			yo: 'よ'
		},
		w: {
			wa: 'わ',
			wo: 'を'
		},
		_n: {
			n: 'ｎ'
		},
		g: {
			ga: 'が',
			gi: 'ぎ',
			gu: 'ぐ',
			ge: 'げ',
			go: 'ご'
		},
		z: {
			za: 'ざ',
			ji: 'じ',
			zu: 'ず',
			ze: 'ぜ',
			zo: 'ぞ'
		},
		d: {
			da: 'だ',
			dzi: 'じ',
			dzu: 'ず',
			de: 'で',
			do: 'ど'
		},
		b: {
			ba: 'ば',
			bi: 'び',
			bu: 'ぶ',
			be: 'べ',
			bo: 'ぼ'
		},
		p: {
			pa: 'ぱ',
			pi: 'ぴ',
			pu: 'ぷ',
			pe: 'ぺ',
			po: 'ぽ'
		}
	},
	kata: {
		vowel: {
			a: 'ア',
			i: 'イ',
			u: 'ウ',
			e: 'エ',
			o: 'オ'
		},
		k: {
			ka: 'カ',
			ki: 'キ',
			ku: 'ク',
			ke: 'ケ',
			ko: 'コ'
		},
		s: {
			sa: 'サ',
			shi: 'シ',
			su: 'ス',
			se: 'セ',
			so: 'ソ'
		},
		t: {
			ta: 'タ',
			chi: 'チ',
			tsu: 'ツ',
			te: 'テ',
			to: 'ト'
		},
		n: {
			na: 'ナ',
			ni: 'ニ',
			nu: 'ヌ',
			ne: 'ネ',
			no: 'ノ'
		},
		h: {
			ha: 'ハ',
			hi: 'ヒ',
			fu: 'フ',
			he: 'ヘ',
			ho: 'ホ'
		},
		m: {
			ma: 'マ',
			mi: 'ミ',
			mu: 'ム',
			me: 'メ',
			mo: 'モ'
		},
		r: {
			ra: 'ラ',
			ri: 'リ',
			ru: 'ル',
			re: 'レ',
			ro: 'ロ'
		},
		y: {
			ya: 'ヤ',
			yu: 'ユ',
			yo: 'ヨ'
		},
		w: {
			wa: 'ワ',
			wo: 'ヲ'
		},
		_n: {
			n: 'ｎ'
		},
		g: {
			ga: 'ガ',
			gi: 'ギ',
			gu: 'グ',
			ge: 'ゲ',
			go: 'ゴ'
		},
		z: {
			za: 'ザ',
			ji: 'ジ',
			zu: 'ズ',
			ze: 'ゼ',
			zo: 'ゾ'
		},
		d: {
			da: 'サ',
			dzi: 'ジ',
			dzu: 'ズ',
			de: 'デ',
			do: 'ド'
		},
		b: {
			ba: 'バ',
			bi: 'ビ',
			bu: 'ブ',
			be: 'ベ',
			bo: 'ボ'
		},
		p: {
			pa: 'パ',
			pi: 'ピ',
			pu: 'プ',
			pe: 'ペ',
			po: 'ポ'
		}
	}
};

const hiragana = Object.values(kana.hira).reduce(
	(prev, curr) => [...prev, ...Object.values(curr)],
	[] as string[]
);

const katakana = Object.values(kana.kata).reduce(
	(prev, curr) => [...prev, ...Object.values(curr)],
	[] as string[]
);

const kanaCharacters: { [key in Syllabary]: string[] } = {
	hira: hiragana,
	kata: katakana
};

export default kana;
export { hiragana, katakana, kanaCharacters };
export type { Kana, Syllabary, Library };
