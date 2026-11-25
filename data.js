// بيانات الخريطة: عدّل أي مرحلة أو أضف مواضيع جديدة هنا
window.ROADMAP = [
  {
    id: "js",
    emoji: "🧱",
    title: "أساسيات JavaScript التي يحتاجها React",
    weeks: "أسبوع",
    level: "أساس",
    project: "AFCON Morocco 2026",
    priority: false,
    goal: "تكتب كود معالجة بيانات نظيف بدون مكتبات، لأن 80% من React هو JavaScript عادي.",
    topics: [
      { id: "js1", text: "Destructuring و Spread / Rest" },
      { id: "js2", text: "map و filter و reduce و find و some و every" },
      { id: "js3", text: "Closures وكيف تحتفظ الدوال بالمتغيرات" },
      { id: "js4", text: "Promises و async / await و try / catch" },
      { id: "js5", text: "ES Modules: import / export (default و named)" },
      { id: "js6", text: "Optional chaining و Nullish coalescing" },
      {
        id: "js7",
        text: "عدم تعديل المصفوفات والكائنات مباشرة (Immutability)",
      },
    ],
    exercise:
      "أعد كتابة دوال معالجة نتائج مباريات AFCON (مجموع الأهداف، ترتيب الفرق، تجميع حسب الدور) بدون أي مكتبة.",
    tips: [
      "إذا فهمت الـ immutability مبكرًا ستتجنب أغلب أخطاء الـ state لاحقًا.",
      "تدرّب على قراءة كود غيرك بدل كتابة الجديد فقط.",
    ],
    resources: [
      { label: "javascript.info", url: "https://javascript.info" },
      {
        label: "MDN: JavaScript Guide",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
      },
    ],
    snippet:
      "const matches = [{ team: 'MAR', goals: 2 }, { team: 'EGY', goals: 1 }];\n\nconst total = matches.reduce((sum, m) => sum + m.goals, 0);\nconst winners = matches.filter(m => m.goals > 1).map(({ team }) => team);\n\n// تحديث بدون تعديل الأصل\nconst updated = matches.map(m => m.team === 'EGY' ? { ...m, goals: m.goals + 1 } : m);",
  },
  {
    id: "core",
    emoji: "⚛️",
    title: "React الأساسي: المكوّنات و JSX",
    weeks: "1 - 2 أسبوع",
    level: "أساس",
    project: "البورتفوليو",
    priority: false,
    goal: "تفكّر بالمكوّنات: تقسّم أي واجهة إلى قطع صغيرة قابلة لإعادة الاستخدام.",
    topics: [
      {
        id: "c1",
        text: "JSX وقواعده (إغلاق الوسوم، className، التعابير داخل {})",
      },
      { id: "c2", text: "المكوّنات والـ props وتمرير children" },
      { id: "c3", text: "الـ rendering الشرطي (&& و ternary)" },
      { id: "c4", text: "عرض القوائم مع key صحيح" },
      { id: "c5", text: "الأحداث: onClick و onChange و onSubmit" },
      { id: "c6", text: "فهم متى ولماذا يعيد React الرسم (re-render)" },
      { id: "c7", text: "رفع الحالة للأعلى (Lifting state up)" },
    ],
    exercise:
      "قسّم قسمًا من البورتفوليو (Projects مثلًا) إلى ProjectCard و ProjectList و Filter، وكلها تستقبل البيانات من ملف data.",
    tips: [
      "إذا كرّرت نفس الـ JSX مرتين، فهذا مكوّن جديد.",
      "لا تستخدم index كـ key إذا كانت القائمة تتغيّر.",
    ],
    resources: [
      { label: "react.dev: Learn", url: "https://react.dev/learn" },
      {
        label: "Thinking in React",
        url: "https://react.dev/learn/thinking-in-react",
      },
    ],
    snippet:
      'function MatchCard({ team, goals, children }) {\n  return (\n    <div className="rounded-xl p-4 bg-slate-800">\n      <h3>{team}: {goals}</h3>\n      {children}\n    </div>\n  );\n}\n\n// الاستعمال\n{matches.map(m => <MatchCard key={m.id} {...m} />)}',
  },
  {
    id: "hooks",
    emoji: "🪝",
    title: "الـ Hooks بعمق (أهم مرحلة)",
    weeks: "2 أسبوع",
    level: "متوسط",
    project: "ToolShare",
    priority: true,
    goal: "تتحكّم في الحالة والآثار الجانبية وتكتب Custom Hooks خاصة بك.",
    topics: [
      { id: "h1", text: "useState: الحالة البسيطة والـ functional updates" },
      { id: "h2", text: "useEffect: مصفوفة الاعتماديات و cleanup" },
      { id: "h3", text: "useRef: الوصول لعناصر DOM وحفظ قيم بدون re-render" },
      { id: "h4", text: "useMemo و useCallback ومتى لا تحتاجهما" },
      { id: "h5", text: "useReducer للحالات المعقّدة" },
      { id: "h6", text: "useContext و Context API" },
      {
        id: "h7",
        text: "كتابة Custom Hooks: useFetch و useLocalStorage و useDebounce",
      },
      { id: "h8", text: "قواعد الـ Hooks ولماذا توجد" },
    ],
    exercise:
      "ابنِ useAuth لواجهة ToolShare: يخزّن المستخدم والـ token، ويوفّر login و logout عبر Context.",
    tips: [
      "أغلب أخطاء useEffect سببها اعتماديات ناقصة، فاقرأ تحذيرات ESLint.",
      "لا تضع useMemo في كل مكان، قِس أولًا ثم حسّن.",
    ],
    resources: [
      {
        label: "react.dev: Hooks",
        url: "https://react.dev/reference/react/hooks",
      },
      {
        label: "You Might Not Need an Effect",
        url: "https://react.dev/learn/you-might-not-need-an-effect",
      },
    ],
    snippet:
      "function useFetch(url) {\n  const [data, setData] = useState(null);\n  const [error, setError] = useState(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    const ctrl = new AbortController();\n    fetch(url, { signal: ctrl.signal })\n      .then(r => r.json())\n      .then(setData)\n      .catch(e => e.name !== 'AbortError' && setError(e))\n      .finally(() => setLoading(false));\n    return () => ctrl.abort();\n  }, [url]);\n\n  return { data, error, loading };\n}",
  },
  {
    id: "router",
    emoji: "🧭",
    title: "التوجيه والنماذج",
    weeks: "1 - 2 أسبوع",
    level: "متوسط",
    project: "ToolShare",
    priority: true,
    goal: "تبني تنقّلًا كاملًا وصفحات محمية حسب الدور، ونماذج مع تحقق.",
    topics: [
      { id: "r1", text: "React Router: Routes و Link و NavLink" },
      { id: "r2", text: "المسارات المتداخلة و Outlet و Layouts" },
      { id: "r3", text: "useParams و useNavigate و useSearchParams" },
      { id: "r4", text: "Protected Routes حسب الدور (Admin / Manager / User)" },
      { id: "r5", text: "الحقول المتحكَّم بها (Controlled inputs)" },
      { id: "r6", text: "React Hook Form" },
      { id: "r7", text: "التحقق بـ Zod وعرض رسائل الأخطاء" },
      { id: "r8", text: "صفحة 404 وصفحة 403" },
    ],
    exercise:
      "صفحات login و register في ToolShare مع حماية المسارات حسب الدور، وإعادة التوجيه بعد الدخول.",
    tips: [
      "ضع منطق الحماية في مكوّن واحد، لا تكرّره في كل صفحة.",
      "اجعل رسائل التحقق في الواجهة نفس منطق التحقق في الخلفية.",
    ],
    resources: [
      { label: "React Router", url: "https://reactrouter.com" },
      { label: "React Hook Form", url: "https://react-hook-form.com" },
      { label: "Zod", url: "https://zod.dev" },
    ],
    snippet:
      'function ProtectedRoute({ roles }) {\n  const { user } = useAuth();\n  if (!user) return <Navigate to="/login" replace />;\n  if (roles && !roles.includes(user.role)) return <Navigate to="/403" replace />;\n  return <Outlet />;\n}\n\n// في الـ Routes\n<Route element={<ProtectedRoute roles={[\'admin\']} />}>\n  <Route path="/admin" element={<AdminPage />} />\n</Route>',
  },
  {
    id: "data",
    emoji: "🌐",
    title: "جلب البيانات: Axios و React Query",
    weeks: "2 أسبوع",
    level: "متوسط",
    project: "ToolShare",
    priority: true,
    goal: "تتعامل مع الخلفية باحتراف: cache وحالات تحميل وأخطاء وتحديث تلقائي.",
    topics: [
      { id: "d1", text: "Axios instance و baseURL" },
      { id: "d2", text: "Interceptors: إرفاق JWT ومعالجة 401" },
      { id: "d3", text: "React Query: useQuery و queryKey" },
      { id: "d4", text: "useMutation و invalidateQueries" },
      { id: "d5", text: "حالات loading و error و empty في كل شاشة" },
      { id: "d6", text: "Pagination و Search مع queryKey ديناميكي" },
      { id: "d7", text: "Optimistic updates" },
      { id: "d8", text: "تنظيم طبقة API في ملفات مستقلة" },
    ],
    exercise:
      "قائمة المعدّات والحجوزات في ToolShare بـ React Query، مع إنشاء حجز وتحديث القائمة تلقائيًا بعد النجاح.",
    tips: [
      "حالة الخادم تذهب إلى React Query، وحالة الواجهة إلى useState أو Zustand.",
      "اجعل كل صفحة تعرض الحالات الثلاث: تحميل، خطأ، فارغ.",
    ],
    resources: [
      { label: "TanStack Query", url: "https://tanstack.com/query/latest" },
      { label: "Axios Docs", url: "https://axios-http.com/docs/intro" },
    ],
    snippet:
      "const { data, isLoading, error } = useQuery({\n  queryKey: ['tools', page],\n  queryFn: () => api.get('/tools', { params: { page } }).then(r => r.data),\n});\n\nconst reserve = useMutation({\n  mutationFn: (body) => api.post('/reservations', body),\n  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reservations'] }),\n});",
  },
  {
    id: "state",
    emoji: "🗃️",
    title: "إدارة الحالة",
    weeks: "أسبوع",
    level: "متوسط",
    project: "AFCON Morocco 2026",
    priority: false,
    goal: "تعرف أي أداة تستعمل لأي نوع حالة، فلا تعقّد الأمور.",
    topics: [
      { id: "s1", text: "القاعدة: محلية أولًا، ثم Context، ثم مكتبة" },
      { id: "s2", text: "Context API: متى ينفع ومتى يسبّب re-renders كثيرة" },
      { id: "s3", text: "Zustand: stores و selectors" },
      { id: "s4", text: "حفظ الحالة في localStorage (persist)" },
      { id: "s5", text: "الفرق بين حالة الخادم وحالة الواجهة" },
      { id: "s6", text: "تجنّب Prop drilling بالتركيب (composition)" },
    ],
    exercise:
      "أضف إلى تطبيق AFCON فرقًا مفضّلة محفوظة بـ Zustand persist، وفلتر مباريات يعمل من أي مكوّن.",
    tips: [
      "إن كانت الحالة تُستعمل في مكوّن واحد، فلا تضعها في store عام.",
      "استعمل selectors في Zustand لتقليل إعادة الرسم.",
    ],
    resources: [
      { label: "Zustand", url: "https://zustand.docs.pmnd.rs" },
      {
        label: "Managing State (react.dev)",
        url: "https://react.dev/learn/managing-state",
      },
    ],
    snippet:
      "const useFavorites = create(persist((set) => ({\n  teams: [],\n  toggle: (t) => set((s) => ({\n    teams: s.teams.includes(t) ? s.teams.filter(x => x !== t) : [...s.teams, t],\n  })),\n}), { name: 'favorites' }));\n\n// selector: المكوّن يتحدّث فقط عند تغيّر هذه القيمة\nconst teams = useFavorites((s) => s.teams);",
  },
  {
    id: "test",
    emoji: "🧪",
    title: "الاختبار: Jest و React Testing Library",
    weeks: "1 - 2 أسبوع",
    level: "متقدّم",
    project: "ToolShare",
    priority: true,
    goal: "تختبر سلوك المستخدم لا التفاصيل الداخلية، وتثق في كودك عند التعديل.",
    topics: [
      { id: "t1", text: "إعداد Jest أو Vitest مع Testing Library" },
      {
        id: "t2",
        text: "render و screen والاستعلامات (getBy / findBy / queryBy)",
      },
      { id: "t3", text: "user-event لمحاكاة الكتابة والنقر" },
      { id: "t4", text: "اختبار النماذج وحالات الخطأ" },
      { id: "t5", text: "محاكاة طلبات الـ API (mocking)" },
      { id: "t6", text: "اختبار الـ custom hooks" },
      { id: "t7", text: "اختبار المسارات المحمية" },
    ],
    exercise:
      "اختبر نموذج الدخول وقائمة الحجوزات في ToolShare، مع حالة نجاح وحالة فشل لكل واحد.",
    tips: [
      "استعمل getByRole قبل غيرها، فهي تعكس ما يراه المستخدم.",
      "إذا كان الاختبار يكسر عند تغيير اسم class فهو يختبر شيئًا خاطئًا.",
    ],
    resources: [
      {
        label: "Testing Library",
        url: "https://testing-library.com/docs/react-testing-library/intro",
      },
      { label: "Jest", url: "https://jestjs.io/docs/getting-started" },
    ],
    snippet:
      "test('shows error on bad login', async () => {\n  render(<LoginForm />);\n  await userEvent.type(screen.getByLabelText(/email/i), 'x');\n  await userEvent.click(screen.getByRole('button', { name: /login/i }));\n  expect(await screen.findByText(/invalid/i)).toBeInTheDocument();\n});",
  },
  {
    id: "quality",
    emoji: "🚀",
    title: "الجودة والأداء والنشر",
    weeks: "1 - 2 أسبوع",
    level: "متقدّم",
    project: "ToolShare",
    priority: true,
    goal: "مشروع منظّم وسريع وجاهز للنشر بـ Docker و CI/CD.",
    topics: [
      { id: "q1", text: "تنظيم المجلدات حسب الميزات (features)" },
      { id: "q2", text: "Error Boundaries" },
      { id: "q3", text: "lazy و Suspense وتقسيم الكود" },
      { id: "q4", text: "React.memo وقياس الأداء بـ React DevTools Profiler" },
      { id: "q5", text: "ESLint و Prettier" },
      { id: "q6", text: "متغيّرات البيئة (.env) في Vite" },
      { id: "q7", text: "Dockerfile للواجهة (multi-stage مع Nginx)" },
      { id: "q8", text: "GitHub Actions: تثبيت واختبار وبناء" },
      { id: "q9", text: "إتاحة الوصول (Accessibility) الأساسية" },
    ],
    exercise:
      "أضف إلى ToolShare ملف Dockerfile وworkflow في GitHub Actions يشغّل الاختبارات والبناء عند كل push.",
    tips: [
      "قِس بالـ Profiler قبل أي تحسين، فالتخمين يضيّع الوقت.",
      "CI أخضر على كل commit عادة جيدة جدًا.",
    ],
    resources: [
      {
        label: "Vite: Env Variables",
        url: "https://vitejs.dev/guide/env-and-mode",
      },
      { label: "GitHub Actions", url: "https://docs.github.com/en/actions" },
    ],
    snippet:
      "const Dashboard = lazy(() => import('./pages/Dashboard'));\n\n<Suspense fallback={<Spinner />}>\n  <Dashboard />\n</Suspense>",
  },
  {
    id: "ts",
    emoji: "🔷",
    title: "TypeScript مع React",
    weeks: "2 - 3 أسبوع",
    level: "متقدّم",
    project: "إعادة كتابة مشروع قديم",
    priority: false,
    goal: "تكتب كودًا تكتشف فيه الأخطاء قبل التشغيل.",
    topics: [
      { id: "ts1", text: "الأنواع الأساسية و interface مقابل type" },
      { id: "ts2", text: "Generics" },
      { id: "ts3", text: "تحديد أنواع props و state" },
      { id: "ts4", text: "أنواع الأحداث و refs" },
      { id: "ts5", text: "أنواع استجابات الـ API" },
      { id: "ts6", text: "Utility types: Partial و Pick و Omit" },
    ],
    exercise:
      "حوّل تطبيق AFCON إلى TypeScript ملفًا ملفًا، وابدأ بالأنواع في طبقة الـ API.",
    tips: [
      "تجنّب any، واستعمل unknown ثم ضيّق النوع.",
      "حوّل المشروع تدريجيًا، ولا تعد كتابته كله.",
    ],
    resources: [
      {
        label: "TypeScript Handbook",
        url: "https://www.typescriptlang.org/docs/handbook/intro.html",
      },
      {
        label: "React TypeScript Cheatsheet",
        url: "https://react-typescript-cheatsheet.netlify.app",
      },
    ],
    snippet:
      "type Tool = { id: string; name: string; available: boolean };\n\nfunction ToolCard({ tool }: { tool: Tool }) {\n  return <li>{tool.name} {tool.available ? '✅' : '❌'}</li>;\n}",
  },
  {
    id: "next",
    emoji: "🌍",
    title: "ما بعد React: Next.js و React Native",
    weeks: "4+ أسابيع",
    level: "خبير",
    project: "خطة YouCode (Sprint 4 و 6)",
    priority: false,
    goal: "تنقل معرفتك إلى الويب الكامل (SSR) والموبايل.",
    topics: [
      { id: "n1", text: "Next.js: App Router و Server Components" },
      { id: "n2", text: "جلب البيانات في الخادم و Route Handlers" },
      { id: "n3", text: "SEO و metadata و تحسين الصور" },
      { id: "n4", text: "React Native: المكوّنات الأساسية و StyleSheet" },
      { id: "n5", text: "Expo و Expo Router" },
      { id: "n6", text: "الربط مع API الخاص بك على الموبايل" },
    ],
    exercise:
      "ابنِ نسخة موبايل مصغّرة من ToolShare بـ Expo: تسجيل دخول وقائمة معدّات وحجز.",
    tips: [
      "لا تبدأ Next.js قبل أن تتقن الـ Hooks والـ data fetching.",
      "مفاهيم React Native هي نفس مفاهيم React، لكن الوسوم تختلف.",
    ],
    resources: [
      { label: "Next.js Learn", url: "https://nextjs.org/learn" },
      { label: "Expo Docs", url: "https://docs.expo.dev" },
    ],
    snippet:
      "// app/tools/page.jsx  (Server Component في Next.js)\nexport default async function ToolsPage() {\n  const res = await fetch('https://api.example.com/tools', { cache: 'no-store' });\n  const tools = await res.json();\n  return <ul>{tools.map(t => <li key={t.id}>{t.name}</li>)}</ul>;\n}",
  },
];
