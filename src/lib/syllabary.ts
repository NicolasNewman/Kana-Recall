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

/** Object containing all kana characters for both syllabarys, seperated by groups */
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
			yu: 'ゆ',
			yo: 'よ'
		},
		w: {
			wa: 'わ',
			wo: 'を'
		},
		_n: {
			n: 'ん'
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
			dzi: 'ぢ',
			dzu: 'づ',
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
			n: 'ん'
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
			da: 'ダ',
			dzi: 'ヂ',
			dzu: 'ヅ',
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

/** List of all hiragana characters */
const hiragana = Object.values(kana.hira).reduce(
	(prev, curr) => [...prev, ...Object.values(curr)],
	[] as string[]
);

/** List of all katakana characters */
const katakana = Object.values(kana.kata).reduce(
	(prev, curr) => [...prev, ...Object.values(curr)],
	[] as string[]
);

/** List of all kana for each syllabary */
const kanaCharacters: { [key in Syllabary]: string[] } = {
	hira: hiragana,
	kata: katakana
};

export type Statistic = {
	recent: number[];
	allTime: {
		correct: number;
		incorrect: number;
	};
};

type StoredStats = {
	hira: {
		あ: Statistic;
		い: Statistic;
		う: Statistic;
		え: Statistic;
		お: Statistic;
		か: Statistic;
		き: Statistic;
		く: Statistic;
		け: Statistic;
		こ: Statistic;
		さ: Statistic;
		し: Statistic;
		す: Statistic;
		せ: Statistic;
		そ: Statistic;
		た: Statistic;
		ち: Statistic;
		つ: Statistic;
		て: Statistic;
		と: Statistic;
		な: Statistic;
		に: Statistic;
		ぬ: Statistic;
		ね: Statistic;
		の: Statistic;
		は: Statistic;
		ひ: Statistic;
		ふ: Statistic;
		へ: Statistic;
		ほ: Statistic;
		ま: Statistic;
		み: Statistic;
		む: Statistic;
		め: Statistic;
		も: Statistic;
		ら: Statistic;
		り: Statistic;
		る: Statistic;
		れ: Statistic;
		ろ: Statistic;
		や: Statistic;
		ゆ: Statistic;
		よ: Statistic;
		わ: Statistic;
		を: Statistic;
		ん: Statistic;
		が: Statistic;
		ぎ: Statistic;
		ぐ: Statistic;
		げ: Statistic;
		ご: Statistic;
		ざ: Statistic;
		じ: Statistic;
		ず: Statistic;
		ぜ: Statistic;
		ぞ: Statistic;
		だ: Statistic;
		ぢ: Statistic;
		づ: Statistic;
		で: Statistic;
		ど: Statistic;
		ば: Statistic;
		び: Statistic;
		ぶ: Statistic;
		べ: Statistic;
		ぼ: Statistic;
		ぱ: Statistic;
		ぴ: Statistic;
		ぷ: Statistic;
		ぺ: Statistic;
		ぽ: Statistic;
	};
	kata: {
		ア: Statistic;
		イ: Statistic;
		ウ: Statistic;
		エ: Statistic;
		オ: Statistic;
		カ: Statistic;
		キ: Statistic;
		ク: Statistic;
		ケ: Statistic;
		コ: Statistic;
		サ: Statistic;
		シ: Statistic;
		ス: Statistic;
		セ: Statistic;
		ソ: Statistic;
		タ: Statistic;
		チ: Statistic;
		ツ: Statistic;
		テ: Statistic;
		ト: Statistic;
		ナ: Statistic;
		ニ: Statistic;
		ヌ: Statistic;
		ネ: Statistic;
		ノ: Statistic;
		ハ: Statistic;
		ヒ: Statistic;
		フ: Statistic;
		ヘ: Statistic;
		ホ: Statistic;
		マ: Statistic;
		ミ: Statistic;
		ム: Statistic;
		メ: Statistic;
		モ: Statistic;
		ラ: Statistic;
		リ: Statistic;
		ル: Statistic;
		レ: Statistic;
		ロ: Statistic;
		ヤ: Statistic;
		ユ: Statistic;
		ヨ: Statistic;
		ワ: Statistic;
		ヲ: Statistic;
		ん: Statistic;
		ガ: Statistic;
		ギ: Statistic;
		グ: Statistic;
		ゲ: Statistic;
		ゴ: Statistic;
		ザ: Statistic;
		ジ: Statistic;
		ズ: Statistic;
		ゼ: Statistic;
		ゾ: Statistic;
		ダ: Statistic;
		ヂ: Statistic;
		ヅ: Statistic;
		デ: Statistic;
		ド: Statistic;
		バ: Statistic;
		ビ: Statistic;
		ブ: Statistic;
		ベ: Statistic;
		ボ: Statistic;
		パ: Statistic;
		ピ: Statistic;
		プ: Statistic;
		ペ: Statistic;
		ポ: Statistic;
	};
};

const DefaultStoredStats: StoredStats = (() => {
	const temp = {
		hira: {},
		kata: {}
	};
	temp['hira'] = hiragana.reduce((prev, curr) => {
		prev[curr] = { allTime: { correct: 0, incorrect: 0 }, recent: [] };
		return prev;
	}, {} as { [key: string]: Statistic });
	temp['kata'] = katakana.reduce((prev, curr) => {
		prev[curr] = { allTime: { correct: 0, incorrect: 0 }, recent: [] };
		return prev;
	}, {} as { [key: string]: Statistic });
	return temp as StoredStats;
})();

export default kana;
export { hiragana, katakana, kanaCharacters };
export { type StoredStats, DefaultStoredStats };
export type { Kana, Syllabary, Library };
