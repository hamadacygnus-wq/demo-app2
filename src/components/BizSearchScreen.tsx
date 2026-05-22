"use client";

import {
  Search,
  MapPin,
  Phone,
  Building2,
  ChevronRight,
  ChevronLeft,
  User,
  Coins,
} from "lucide-react";
import { useState } from "react";

// ベースとなるダミーデータ（ここから30件のユニークなデータを作ります）
const BASE_COMPANIES = [
  { name: "株式会社ダミーテクノロジー", address: "東京都渋谷区道玄坂1-2-3 渋谷ダミービル4F", rep: "山田 太郎", capital: "5,000万円", industry: "IT・通信" },
  { name: "サンプルソリューションズ株式会社", address: "東京都新宿区西新宿4-5-6 新宿サンプルタワー12F", rep: "鈴木 一郎", capital: "1億円", industry: "IT・通信" },
  { name: "テストマーケティング株式会社", address: "東京都港区六本木7-8-9 六本木テストプラザ8F", rep: "佐藤 花子", capital: "3,000万円", industry: "広告・マーケティング" },
  { name: "株式会社デモクリエイティブ", address: "東京都品川区東品川1-1-1 デモフロントビル5F", rep: "田中 健太", capital: "1,500万円", industry: "デザイン・制作" },
  { name: "ダミーコンサルティング合同会社", address: "東京都千代田区霞が関2-2-2 霞が関ダミーセンター3F", rep: "伊藤 美咲", capital: "800万円", industry: "コンサルティング" },
  { name: "株式会社フェイクシステムズ", address: "東京都中央区丸の内3-3-3 丸の内フェイクビル22F", rep: "渡辺 翔太", capital: "2.5億円", industry: "IT・通信" },
  { name: "モックアップ商事株式会社", address: "東京都豊島区東池袋4-4-4 池袋モックスクエア7F", rep: "山本 さくら", capital: "4,000万円", industry: "商社・卸売" },
  { name: "プレースホルダ不動産株式会社", address: "東京都目黒区上大崎5-5-5 目黒プレースホルダビル1F", rep: "中村 陽一", capital: "6,000万円", industry: "不動産" },
  { name: "ダミーロジスティクス株式会社", address: "東京都江東区有明6-6-6 有明ダミーロジパーク", rep: "小林 誠", capital: "8,500万円", industry: "物流・運送" },
  { name: "サンプルメディア株式会社", address: "東京都台東区上野7-7-7 上野サンプルビル9F", rep: "加藤 あゆみ", capital: "2,000万円", industry: "メディア・出版" },
];

// 3ページ分（30件）のデータになるよう自動生成
const DUMMY_COMPANIES = Array.from({ length: 30 }, (_, i) => {
  const base = BASE_COMPANIES[i % 10];
  const page = Math.floor(i / 10) + 1;
  // ページごとに少し名前を変えて、別会社っぽく見せる
  const companyName = page === 1 ? base.name : page === 2 ? `【新】${base.name}` : `${base.name} 第${page}事業部`;
  return {
    id: i + 1,
    name: companyName,
    // 電話番号も1件ずつ違う番号になるように生成
    phone: `03-${String(1000 + i).padStart(4, '0')}-${String(5678 + i).padStart(4, '0')}`,
    address: base.address,
    rep: base.rep,
    capital: base.capital,
    industry: base.industry,
  };
});

export function BizSearchScreen() {
  // 現在のページ番号を管理するステート（初期値は1）
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = 3;

  // 現在のページに表示する10件を切り出す
  const currentCompanies = DUMMY_COMPANIES.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ページ変更処理
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // ページが変わったら画面の一番上までスクロールさせる
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      {/* ヘッダー（検索バー） */}
      <header className="bg-[#0f172a] text-white py-4 px-6 shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-sky-400" />
            <h1 className="text-2xl font-black tracking-wider text-white">【デモ】サイトクローリング</h1>
          </div>
          
          <div className="flex-1 max-w-3xl flex bg-white rounded-md overflow-hidden">
            <input type="text" value="東京都　IT・通信" readOnly className="flex-1 px-4 py-2.5 text-slate-800 outline-none font-bold" />
            <button className="bg-sky-500 hover:bg-sky-600 transition px-6 py-2.5 font-bold flex items-center gap-2">
              <Search className="h-5 w-5" />
              検索する
            </button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-6xl mx-auto p-6 flex gap-8 items-start">
        
        {/* 左側：ダミーの絞り込みメニュー */}
        <aside className="w-64 bg-white p-5 rounded-lg shadow-sm border border-slate-200 shrink-0 sticky top-24">
          <h2 className="font-black text-lg border-b border-slate-200 pb-3 mb-4">絞り込み条件</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-sm text-slate-500 mb-2">エリア</h3>
              <label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked readOnly className="rounded" /> 東京都 (450)</label>
            </div>
            
            <div className="pt-4 border-t border-slate-200">
              <h3 className="font-bold text-sm text-slate-500 mb-2">業種</h3>
              <label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked readOnly className="rounded" /> IT・通信など</label>
            </div>
          </div>
        </aside>

        {/* 右側：企業リスト */}
        <div className="flex-1">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-bold">
              「<span className="text-sky-600">東京都 IT・通信</span>」の検索結果
            </h2>
            <div className="text-sm font-bold text-slate-500">
              全 <span className="text-lg text-slate-800">450</span> 件中 {(currentPage - 1) * 10 + 1}〜{currentPage * 10}件を表示
            </div>
          </div>

          <div className="space-y-5">
            {currentCompanies.map((company) => (
              <div key={company.id} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:border-sky-300 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-black text-sky-700 cursor-pointer hover:underline">
                    {company.name}
                  </h3>
                  <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full border border-slate-200">
                    {company.industry}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-slate-400" />
                    <span className="font-bold text-lg text-slate-700">{company.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-slate-400" />
                    <span className="text-sm text-slate-700">{company.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-slate-400" />
                    <span className="text-sm text-slate-700">代表：{company.rep}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Coins className="h-5 w-5 text-slate-400" />
                    <span className="text-sm text-slate-700">資本金：{company.capital}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ページネーション */}
          <div className="mt-8 flex justify-center items-center gap-2 pb-10">
            {/* 前へボタン */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-10 px-4 flex items-center gap-1 rounded bg-white border border-slate-300 font-bold hover:bg-slate-50 disabled:opacity-50 transition"
            >
              <ChevronLeft className="h-5 w-5" /> 前へ
            </button>

            {/* 1, 2, 3 の番号ボタン */}
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`h-10 w-10 flex items-center justify-center rounded font-bold shadow-sm transition ${
                  currentPage === page
                    ? "bg-sky-500 text-white border-transparent"
                    : "bg-white border border-slate-300 hover:bg-slate-50 text-slate-700"
                }`}
              >
                {page}
              </button>
            ))}

            <span className="px-2 text-slate-400">...</span>
            
            {/* 次へボタン */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-10 px-4 flex items-center gap-1 rounded bg-white border border-slate-300 font-bold hover:bg-sky-50 hover:text-sky-600 disabled:opacity-50 transition"
            >
              次へ <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
        </div>
      </main>
    </div>
  );
}