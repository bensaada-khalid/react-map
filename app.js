(() => {
  const KEY = "react-roadmap-v1";
  const $ = (s) => document.querySelector(s);
  const phasesEl = $("#phases");

  // ---------- الحالة ----------
  const defaults = { done: {}, open: {}, filter: "all", q: "", theme: "dark" };
  let state = load();

  function load() {
    try {
      return { ...defaults, ...(JSON.parse(localStorage.getItem(KEY)) || {}) };
    } catch (e) {
      return { ...defaults };
    }
  }
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      /* تجاهل */
    }
  }

  // ---------- حسابات ----------
  const phaseStats = (p) => {
    const total = p.topics.length;
    const done = p.topics.filter((t) => state.done[t.id]).length;
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  };
  const statusOf = (p) => {
    const { done, total } = phaseStats(p);
    return done === 0 ? "todo" : done === total ? "done" : "progress";
  };
  const overall = () => {
    const all = ROADMAP.flatMap((p) => p.topics);
    const done = all.filter((t) => state.done[t.id]).length;
    return {
      total: all.length,
      done,
      pct: Math.round((done / all.length) * 100),
    };
  };
  const levelOf = (pct) => {
    if (pct >= 100) return "أسطورة React 👑";
    if (pct >= 80) return "خبير 🏆";
    if (pct >= 60) return "محترف 🔥";
    if (pct >= 40) return "متقدّم ⚡";
    if (pct >= 20) return "متعلّم 📘";
    return "مبتدئ 🌱";
  };
  const BADGES = [
    { pct: 10, label: "🚀 الانطلاقة" },
    { pct: 25, label: "🧩 رُبع الطريق" },
    { pct: 50, label: "⚔️ نصف الطريق" },
    { pct: 75, label: "🔥 ثلاثة أرباع" },
    { pct: 100, label: "👑 الختمة" },
  ];

  // ---------- الرسم ----------
  const levelColors = {
    أساس: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
    متوسط: "bg-sky-500/15 text-sky-600 dark:text-sky-300",
    متقدّم: "bg-violet-500/15 text-violet-600 dark:text-violet-300",
    خبير: "bg-rose-500/15 text-rose-600 dark:text-rose-300",
  };
  const statusStyle = {
    todo: "border-slate-200 dark:border-slate-800",
    progress: "border-sky-400/60",
    done: "border-emerald-400/60",
  };

  function matches(p) {
    const q = state.q.trim().toLowerCase();
    const st = statusOf(p);
    if (state.filter === "todo" && st !== "todo") return false;
    if (state.filter === "progress" && st !== "progress") return false;
    if (state.filter === "done" && st !== "done") return false;
    if (state.filter === "sprint" && !p.priority) return false;
    if (!q) return true;
    const hay = [
      p.title,
      p.project,
      p.goal,
      p.exercise,
      ...p.topics.map((t) => t.text),
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  }

  function phaseHTML(p, i) {
    const s = phaseStats(p);
    const st = statusOf(p);
    const open = !!state.open[p.id];
    const stIcon = st === "done" ? "✅" : st === "progress" ? "🔄" : "⏳";
    const topics = p.topics
      .map(
        (t) => `
      <label class="flex items-start gap-3 py-2 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer">
        <input type="checkbox" class="check mt-0.5" data-topic="${t.id}" ${state.done[t.id] ? "checked" : ""} />
        <span class="${state.done[t.id] ? "line-through opacity-50" : ""}">${t.text}</span>
      </label>`,
      )
      .join("");
    const tips = p.tips.map((x) => `<li>💡 ${x}</li>`).join("");
    const res = p.resources
      .map(
        (r) =>
          `<a href="${r.url}" target="_blank" rel="noopener" class="px-3 py-1.5 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-300 text-sm hover:bg-sky-500/20">🔗 ${r.label}</a>`,
      )
      .join("");

    return `
    <article class="rounded-3xl bg-white dark:bg-slate-900 border-2 ${statusStyle[st]} transition-colors pop" data-phase="${p.id}">
      <button class="w-full text-start p-5 flex items-center gap-4" data-toggle="${p.id}" aria-expanded="${open}">
        <div class="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 grid place-content-center text-2xl shrink-0">${p.emoji}</div>
        <div class="flex-1 min-w-0">
          <div class="flex flex-wrap items-center gap-2 mb-1">
            <span class="text-xs font-bold text-slate-400">المرحلة ${i + 1}</span>
            <span class="text-xs px-2 py-0.5 rounded-full ${levelColors[p.level] || ""}">${p.level}</span>
            <span class="text-xs px-2 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300">⏱ ${p.weeks}</span>
            ${p.priority ? '<span class="text-xs px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-600 dark:text-amber-300 font-bold">Sprint 3</span>' : ""}
          </div>
          <h3 class="font-bold text-lg leading-snug">${p.title}</h3>
          <div class="mt-2 flex items-center gap-3">
            <div class="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div class="h-full ${st === "done" ? "bg-emerald-400" : "bg-sky-400"} transition-all duration-500" style="width:${s.pct}%"></div>
            </div>
            <span class="text-xs text-slate-500 w-16 text-end">${s.done}/${s.total} ${stIcon}</span>
          </div>
        </div>
        <span class="text-slate-400 transition-transform ${open ? "rotate-180" : ""}">▼</span>
      </button>

      <div class="panel px-5 ${open ? "pb-6 opacity-100" : "opacity-0"}" style="max-height:${open ? "3000px" : "0"}">
        <p class="text-slate-600 dark:text-slate-300 mb-4">🎯 <b>الهدف:</b> ${p.goal}</p>

        <div class="grid lg:grid-cols-2 gap-5">
          <div>
            <h4 class="font-bold mb-2">📋 ما تتعلّمه</h4>
            <div class="space-y-0.5">${topics}</div>
            <div class="mt-3 flex gap-2">
              <button class="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-500/20" data-all="${p.id}">تحديد الكل</button>
              <button class="text-xs px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800" data-none="${p.id}">إلغاء الكل</button>
            </div>
          </div>

          <div class="space-y-4">
            <div class="rounded-2xl p-4 bg-indigo-500/10 border border-indigo-400/20">
              <h4 class="font-bold mb-1">🛠 تمرين تطبيقي (${p.project})</h4>
              <p class="text-sm text-slate-700 dark:text-slate-300">${p.exercise}</p>
            </div>
            <ul class="text-sm space-y-1 text-slate-600 dark:text-slate-300">${tips}</ul>
            <div class="flex flex-wrap gap-2">${res}</div>
          </div>
        </div>

        <div class="mt-5">
          <div class="flex items-center justify-between mb-2">
            <h4 class="font-bold">🧪 مثال سريع</h4>
            <button class="text-xs px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800" data-copy="${p.id}">نسخ الكود</button>
          </div>
          <pre dir="ltr" class="rounded-2xl p-4 bg-slate-900 text-slate-100 text-sm overflow-x-auto text-left"><code data-code="${p.id}"></code></pre>
        </div>
      </div>
    </article>`;
  }

  function renderPhases() {
    const list = ROADMAP.map((p, i) => ({ p, i })).filter(({ p }) =>
      matches(p),
    );
    phasesEl.innerHTML = list.map(({ p, i }) => phaseHTML(p, i)).join("");
    $("#empty").classList.toggle("hidden", list.length > 0);
    // الكود يُدرج كنص حتى لا يُفسَّر كـ HTML
    phasesEl.querySelectorAll("[data-code]").forEach((el) => {
      const p = ROADMAP.find((x) => x.id === el.dataset.code);
      el.textContent = p.snippet;
    });
  }

  function renderFilters() {
    const items = [
      ["all", "الكل"],
      ["sprint", "⚡ Sprint 3"],
      ["todo", "لم أبدأ"],
      ["progress", "قيد التعلّم"],
      ["done", "مكتملة"],
    ];
    $("#filters").innerHTML = items
      .map(
        ([k, l]) =>
          `<button data-filter="${k}" class="px-4 py-2 rounded-xl text-sm font-semibold transition ${
            state.filter === k
              ? "bg-sky-500 text-white"
              : "bg-slate-200 dark:bg-slate-800 hover:opacity-80"
          }">${l}</button>`,
      )
      .join("");
  }

  function renderHeader() {
    const o = overall();
    $("#pct").textContent = o.pct + "%";
    $("#ring").style.strokeDashoffset = 326.73 * (1 - o.pct / 100);
    $("#levelBadge").textContent = levelOf(o.pct);
    $("#countText").textContent = `أنجزتَ ${o.done} من ${o.total} موضوعًا`;

    // الخطوة التالية: أول موضوع غير منجز في أول مرحلة غير مكتملة
    let next = null;
    for (const p of ROADMAP) {
      const t = p.topics.find((x) => !state.done[x.id]);
      if (t) {
        next = { p, t };
        break;
      }
    }
    $("#nextText").textContent = next
      ? `الخطوة التالية: ${next.t.text} (${next.p.title})`
      : "أنهيتَ الخريطة كلها، مبروك! 🎉";

    // تقدّم مراحل Sprint 3
    const sp = ROADMAP.filter((p) => p.priority).flatMap((p) => p.topics);
    const sd = sp.filter((t) => state.done[t.id]).length;
    const spPct = sp.length ? Math.round((sd / sp.length) * 100) : 0;
    $("#sprintFill").style.width = spPct + "%";
    $("#sprintText").textContent = `${sd} من ${sp.length} موضوعًا (${spPct}%)`;

    $("#badges").innerHTML = BADGES.map((b) => {
      const on = o.pct >= b.pct;
      return `<span class="px-3 py-1.5 rounded-full text-sm font-semibold ${
        on
          ? "bg-amber-400/20 text-amber-600 dark:text-amber-300"
          : "bg-slate-200 dark:bg-slate-800 text-slate-400 opacity-60"
      }">${on ? b.label : "🔒 " + b.pct + "%"}</span>`;
    }).join("");
  }

  function renderAll() {
    renderFilters();
    renderHeader();
    renderPhases();
    applyTheme();
  }

  // ---------- أدوات ----------
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.remove("hidden");
    clearTimeout(toast.id);
    toast.id = setTimeout(() => t.classList.add("hidden"), 2400);
  }
  function applyTheme() {
    document.documentElement.classList.toggle("dark", state.theme === "dark");
    $("#themeBtn").textContent = state.theme === "dark" ? "☀️" : "🌙";
  }

  // ---------- الأحداث ----------
  document.addEventListener("click", (e) => {
    const el = e.target.closest("button, a");
    if (!el) return;

    if (el.dataset.toggle) {
      const id = el.dataset.toggle;
      state.open[id] = !state.open[id];
      save();
      renderPhases();
    } else if (el.dataset.filter) {
      state.filter = el.dataset.filter;
      save();
      renderFilters();
      renderPhases();
    } else if (el.dataset.all || el.dataset.none) {
      const id = el.dataset.all || el.dataset.none;
      const p = ROADMAP.find((x) => x.id === id);
      const val = !!el.dataset.all;
      const before = statusOf(p);
      p.topics.forEach((t) => (state.done[t.id] = val));
      save();
      renderAll();
      if (val && before !== "done") toast(`🎉 أنهيتَ مرحلة: ${p.title}`);
    } else if (el.dataset.copy) {
      const p = ROADMAP.find((x) => x.id === el.dataset.copy);
      navigator.clipboard.writeText(p.snippet).then(
        () => toast("تم نسخ الكود ✅"),
        () => toast("تعذّر النسخ"),
      );
    } else if (el.id === "themeBtn") {
      state.theme = state.theme === "dark" ? "light" : "dark";
      save();
      applyTheme();
    } else if (el.id === "resetBtn") {
      if (confirm("هل تريد مسح كل تقدّمك؟")) {
        state = { ...defaults, theme: state.theme };
        save();
        $("#search").value = "";
        renderAll();
      }
    } else if (el.id === "toggleAll") {
      const anyClosed = ROADMAP.some((p) => !state.open[p.id]);
      ROADMAP.forEach((p) => (state.open[p.id] = anyClosed));
      save();
      renderPhases();
    }
  });

  document.addEventListener("change", (e) => {
    const id = e.target.dataset && e.target.dataset.topic;
    if (!id) return;
    const phase = ROADMAP.find((p) => p.topics.some((t) => t.id === id));
    const before = statusOf(phase);
    state.done[id] = e.target.checked;
    save();
    renderHeader();
    renderPhases();
    if (before !== "done" && statusOf(phase) === "done")
      toast(`🎉 أنهيتَ مرحلة: ${phase.title}`);
  });

  $("#search").addEventListener("input", (e) => {
    state.q = e.target.value;
    renderPhases();
  });

  // افتح أول مرحلة غير مكتملة عند أول زيارة
  if (!Object.keys(state.open).length) {
    const first = ROADMAP.find((p) => statusOf(p) !== "done");
    if (first) state.open[first.id] = true;
  }
  $("#search").value = state.q;
  renderAll();
})();
