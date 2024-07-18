type Kana<T = string> = {
	vowel: {
		a: T;
		i: T;
		u: T;
		e: T;
		o: T;
	};
	k: {
		ka: T;
		ki: T;
		ku: T;
		ke: T;
		ko: T;
	};
	s: {
		sa: T;
		shi: T;
		su: T;
		se: T;
		so: T;
	};
	t: {
		ta: T;
		chi: T;
		tsu: T;
		te: T;
		to: T;
	};
	n: {
		na: T;
		ni: T;
		nu: T;
		ne: T;
		no: T;
	};
	h: {
		ha: T;
		hi: T;
		fu: T;
		he: T;
		ho: T;
	};
	m: {
		ma: T;
		mi: T;
		mu: T;
		me: T;
		mo: T;
	};
	r: {
		ra: T;
		ri: T;
		ru: T;
		re: T;
		ro: T;
	};
	y: {
		ya: T;
		yu: T;
		yo: T;
	};
	w: {
		wa: T;
		wo: T;
	};
	_n: {
		n: T;
	};
	g: {
		ga: T;
		gi: T;
		gu: T;
		ge: T;
		go: T;
	};
	z: {
		za: T;
		ji: T;
		zu: T;
		ze: T;
		zo: T;
	};
	d: {
		da: T;
		dzi: T;
		dzu: T;
		de: T;
		do: T;
	};
	b: {
		ba: T;
		bi: T;
		bu: T;
		be: T;
		bo: T;
	};
	p: {
		pa: T;
		pi: T;
		pu: T;
		pe: T;
		po: T;
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
	recent: {
		accuracy: number[];
		recall: number[];
	};
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

type KanaGroupName =
	| 'vowel'
	| 'k_'
	| 's_'
	| 't_'
	| 'n_'
	| 'h_'
	| 'm_'
	| 'r_'
	| 'y_'
	| 'w_'
	| 'g_'
	| 'z_'
	| 'd_'
	| 'b_'
	| 'p_';

const kanaGroupMap: { [key: string]: KanaGroupName } = {
	あ: 'vowel',
	い: 'vowel',
	う: 'vowel',
	え: 'vowel',
	お: 'vowel',
	か: 'k_',
	き: 'k_',
	く: 'k_',
	け: 'k_',
	こ: 'k_',
	さ: 's_',
	し: 's_',
	す: 's_',
	せ: 's_',
	そ: 's_',
	た: 't_',
	ち: 't_',
	つ: 't_',
	て: 't_',
	と: 't_',
	な: 'n_',
	に: 'n_',
	ぬ: 'n_',
	ね: 'n_',
	の: 'n_',
	は: 'h_',
	ひ: 'h_',
	ふ: 'h_',
	へ: 'h_',
	ほ: 'h_',
	ま: 'm_',
	み: 'm_',
	む: 'm_',
	め: 'm_',
	も: 'm_',
	ら: 'r_',
	り: 'r_',
	る: 'r_',
	れ: 'r_',
	ろ: 'r_',
	や: 'y_',
	ゆ: 'y_',
	よ: 'y_',
	わ: 'w_',
	を: 'w_',
	ん: 'w_',
	が: 'g_',
	ぎ: 'g_',
	ぐ: 'g_',
	げ: 'g_',
	ご: 'g_',
	ざ: 'z_',
	じ: 'z_',
	ず: 'z_',
	ぜ: 'z_',
	ぞ: 'z_',
	だ: 'd_',
	ぢ: 'd_',
	づ: 'd_',
	で: 'd_',
	ど: 'd_',
	ば: 'b_',
	び: 'b_',
	ぶ: 'b_',
	べ: 'b_',
	ぼ: 'b_',
	ぱ: 'p_',
	ぴ: 'p_',
	ぷ: 'p_',
	ぺ: 'p_',
	ぽ: 'p_',
	ア: 'vowel',
	イ: 'vowel',
	ウ: 'vowel',
	エ: 'vowel',
	オ: 'vowel',
	カ: 'k_',
	キ: 'k_',
	ク: 'k_',
	ケ: 'k_',
	コ: 'k_',
	サ: 's_',
	シ: 's_',
	ス: 's_',
	セ: 's_',
	ソ: 's_',
	タ: 'k_',
	チ: 'k_',
	ツ: 'k_',
	テ: 'k_',
	ト: 'k_',
	ナ: 'n_',
	ニ: 'n_',
	ヌ: 'n_',
	ネ: 'n_',
	ノ: 'n_',
	ハ: 'h_',
	ヒ: 'h_',
	フ: 'h_',
	ヘ: 'h_',
	ホ: 'h_',
	マ: 'm_',
	ミ: 'm_',
	ム: 'm_',
	メ: 'm_',
	モ: 'm_',
	ラ: 'r_',
	リ: 'r_',
	ル: 'r_',
	レ: 'r_',
	ロ: 'r_',
	ヤ: 'y_',
	ユ: 'y_',
	ヨ: 'y_',
	ワ: 'w_',
	ヲ: 'w_',
	ガ: 'g_',
	ギ: 'g_',
	グ: 'g_',
	ゲ: 'g_',
	ゴ: 'g_',
	ザ: 'z_',
	ジ: 'z_',
	ズ: 'z_',
	ゼ: 'z_',
	ゾ: 'z_',
	ダ: 'd_',
	ヂ: 'd_',
	ヅ: 'd_',
	デ: 'd_',
	ド: 'd_',
	バ: 'b_',
	ビ: 'b_',
	ブ: 'b_',
	ベ: 'b_',
	ボ: 'b_',
	パ: 'p_',
	ピ: 'p_',
	プ: 'p_',
	ペ: 'p_',
	ポ: 'p_'
};

const DefaultStoredStats: StoredStats = (() => {
	const temp = {
		hira: {},
		kata: {}
	};
	temp['hira'] = hiragana.reduce(
		(prev, curr) => {
			prev[curr] = { allTime: { correct: 0, incorrect: 0 }, recent: { accuracy: [], recall: [] } };
			return prev;
		},
		{} as { [key: string]: Statistic }
	);
	temp['kata'] = katakana.reduce(
		(prev, curr) => {
			prev[curr] = { allTime: { correct: 0, incorrect: 0 }, recent: { accuracy: [], recall: [] } };
			return prev;
		},
		{} as { [key: string]: Statistic }
	);
	return temp as StoredStats;
})();

export default kana;
export { hiragana, katakana, kanaCharacters, kanaGroupMap };
export { type StoredStats, DefaultStoredStats };
export type { Kana, Syllabary, Library, KanaGroupName };
