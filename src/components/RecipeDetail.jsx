import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PHONE_HEIGHT = 812; // iPhone 13/14 Pro
const ARROW_SIZE = 32;    // px (your arrow image size)
const ARROW_OFFSET = 6;   // px (how far the button sits outside the container)
const ARROW_PAD = ARROW_SIZE - ARROW_OFFSET + 30; // extra breathing room for text (~56px)

/* ---- helpers for servings scaling ---- */
const FRACTIONS = { '¼': 1/4, '½': 1/2, '¾': 3/4, '⅓': 1/3, '⅔': 2/3, '⅕': 1/5, '⅖': 2/5, '⅗': 3/5, '⅘': 4/5, '⅙': 1/6, '⅚': 5/6, '⅛': 1/8, '⅜': 3/8, '⅝': 5/8, '⅞': 7/8 };

function parseQuantity(input) {
  const s = input.trim();
  if (/^(a|an)\b/i.test(s)) return { qty: 1, rest: s.replace(/^(a|an)\b/i, '').trimStart() };
  let m = s.match(/^(\d+)\s+(\d+)\/(\d+)\b(.*)$/);
  if (m) return { qty: +m[1] + (+m[2]/+m[3]), rest: m[4].trimStart() };
  m = s.match(/^(\d+)\/(\d+)\b(.*)$/);
  if (m) return { qty: +m[1]/+m[2], rest: m[3].trimStart() };
  if (FRACTIONS[s[0]]) return { qty: FRACTIONS[s[0]], rest: s.slice(1).trimStart() };
  m = s.match(/^(\d+(?:\.\d+)?)\b(.*)$/);
  if (m) return { qty: parseFloat(m[1]), rest: m[2].trimStart() };
  return null;
}

function formatQuantity(q) {
  if (!isFinite(q) || q <= 0) return '0';
  const snapped = Math.round(q * 8) / 8;
  const whole = Math.floor(snapped + 1e-9);
  const frac = snapped - whole;
  const map = { [1/8]:'⅛',[1/4]:'¼',[3/8]:'⅜',[1/2]:'½',[5/8]:'⅝',[3/4]:'¾',[7/8]:'⅞' };
  for (const k of Object.keys(map).map(Number)) {
    if (Math.abs(frac - k) < 1e-6) return whole ? `${whole} ${map[k]}` : map[k];
  }
  const rounded = Math.round(snapped * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2);
}

function scaleIngredient(line, factor) {
  const parsed = parseQuantity(line);
  if (!parsed) return line;
  const qtyStr = formatQuantity(parsed.qty * factor);
  if (qtyStr === '0') return line;
  return `${qtyStr} ${parsed.rest}`.replace(/\s+/g, ' ').trim();
}
/* ------------------------------------- */

const RecipeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('instructions');
  const [servings, setServings] = useState(1);

  // paged steps
  const [stepPage, setStepPage] = useState(0);
  const stepsPerPage = 3;

  const fallbackImg =
    'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2F2023-07-chili-crisp-fried-eggs%2FChili-Crisp-Fried-Eggs_153';

  function safeParseArray(val) {
    if (Array.isArray(val)) return val;
    if (typeof val === "string") {
      try {
        const arr = JSON.parse(val);
        return Array.isArray(arr) ? arr : [];
      } catch {
        return [];
      }
    }
    return [];
  }

  // Inject CSS for pager buttons once (no blue highlight)
  useEffect(() => {
    const id = 'pager-btn-css';
    if (!document.getElementById(id)) {
      const style = document.createElement('style');
      style.id = id;
      style.textContent = `
        .step-pager-btn {
          background: transparent;
          border: 0;
          padding: 0;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .step-pager-btn:focus,
        .step-pager-btn:focus-visible { outline: none; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://spatch.onrender.com/recipes/${id}`);
        if (!response.ok) throw new Error('Recipe not found');
        const data = await response.json();
        const fixed = {
          ...data,
          ingredients: safeParseArray(data.ingredients),
          kitchenware: safeParseArray(data.kitchenware),
          steps: safeParseArray(data.steps),
        };
        setRecipe(fixed);
        setServings(fixed.servings || 1);
        setStepPage(0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchRecipe();
  }, [id]);

  useEffect(() => {
    if (activeTab === 'instructions') setStepPage(0);
  }, [activeTab]);

  const adjustServings = (increment) => {
    setServings((prev) => Math.max(1, prev + increment));
  };

  // scale ingredients for display
  const scaledIngredients = useMemo(() => {
    const orig = Math.max(1, Number(recipe?.servings) || 1);
    const factor = (servings || 1) / orig;
    const list = recipe?.ingredients || [];
    return list.map((line) => scaleIngredient(line, factor));
  }, [recipe?.ingredients, recipe?.servings, servings]);

  if (loading) {
    return (
      <div style={{ width: '100vw', height: '100vh', background: '#EDD7B3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-black text-xl">Loading recipe...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ width: '100vw', height: '100vh', background: '#EDD7B3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-red-600 text-xl">Error: {error}</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div style={{ width: '100vw', height: '100vh', background: '#EDD7B3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-black text-xl">Recipe not found</div>
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil((recipe.steps?.length || 0) / stepsPerPage));
  const start = stepPage * stepsPerPage;
  const visibleSteps = (recipe.steps || []).slice(start, start + stepsPerPage);
  const onLastPage = stepPage === totalPages - 1;

  return (
    <div
      style={{
        maxWidth: 480,
        width: "100%",
        margin: "0 auto",
        background: "transparent",
        minHeight: "100dvh",
        height: `${PHONE_HEIGHT}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        boxShadow: "0 2px 20px #0001",
      }}
    >
      {/* Top hero image */}
      <div
        style={{
          width: "100%",
          height: 700,
          backgroundImage: `url(${recipe.imgUrl || fallbackImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          boxShadow: "0 8px 32px #0002",
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* Main card content & mascot bubble */}
      <div
        style={{
          background: "#EDD7B3",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          boxShadow: "0 2px 20px #0001",
          width: "100%",
          marginTop: -25,
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Scrollable main content */}
        <div
          style={{
            width: "100%",
            flex: 1,
            overflowY: "auto",
            padding: "32px 16px 0 16px",
          }}
        >
          {/* Title */}
          <div
            style={{
              color: '#000',
              fontSize: 32,
              fontWeight: 900,
              textAlign: 'center',
              marginBottom: 4,
              fontFamily: "'ComicCAT', 'Fredoka', Arial, sans-serif",
            }}
          >
            {recipe.nickname || 'Crimson Sunset'}
          </div>
          {/* Subtitle */}
          <div
            style={{
              color: '#000',
              fontSize: 20,
              textAlign: 'center',
              marginBottom: 12,
              fontFamily: "'ComicCAT', 'Fredoka', Arial, sans-serif",
            }}
          >
            {recipe.real_name || 'Chilli oil fried egg'}
          </div>

          {/* Time/Servings */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 16,
              marginBottom: 12,
            }}
          >
            <span>
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/96c8ccf032344656716aafa24d2a0d786adf181b?width=52"
                alt="clock"
                style={{ width: 24, verticalAlign: 'middle', marginRight: 4, marginTop: -2 }}
              />
              {recipe.time || 10} mins
            </span>
            <span>
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/791b59fa3cb38bee2d863c91c102b914635c0703?width=120"
                alt="people"
                style={{ width: 32, verticalAlign: 'middle', marginRight: 4, marginTop: -2 }}
              />
              {servings} serving{servings !== 1 ? 's' : ''}
            </span>
            <span>
              <button
                type="button"
                onClick={() => adjustServings(1)}
                style={{
                  background: '#FE9A1C',
                  borderRadius: 8,
                  margin: '0 3px',
                  border: 'none',
                  width: 24,
                  height: 24,
                  fontWeight: 900,
                  fontSize: 18,
                  cursor: 'pointer',
                }}
              >
                +
              </button>
              <button
                type="button"
                onClick={() => adjustServings(-1)}
                style={{
                  background: '#FE9A1C',
                  borderRadius: 8,
                  border: 'none',
                  width: 24,
                  height: 24,
                  fontWeight: 900,
                  fontSize: 18,
                  cursor: 'pointer',
                }}
              >
                –
              </button>
            </span>
          </div>

          {/* Tabs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 16,
              marginBottom: 16,
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab('ingredients')}
              style={{
                border: '2px solid #4FB9AF',
                borderRadius: 24,
                padding: '4px 24px',
                fontWeight: 700,
                fontSize: 20,
                color: activeTab === 'ingredients' ? '#000' : '#444',
                background: activeTab === 'ingredients' ? '#FFF' : 'transparent',
                outline: 'none',
              }}
            >
              Ingredients
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('instructions')}
              style={{
                border: '2px solid #4FB9AF',
                borderRadius: 24,
                padding: '4px 24px',
                fontWeight: 700,
                fontSize: 20,
                color: activeTab === 'instructions' ? '#000' : '#444',
                background: activeTab === 'instructions' ? '#4FB9AF' : 'transparent',
                outline: 'none',
              }}
            >
              Instructions
            </button>
          </div>

          {/* Content */}
          {activeTab === 'ingredients' ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: 24,
                fontSize: 18,
                minHeight: 100,
                marginBottom: 16,
              }}
            >
              <ul style={{ listStyle: 'disc', paddingLeft: 24 }}>
                {scaledIngredients.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <ul style={{ listStyle: 'disc', paddingLeft: 24 }}>
                {recipe.kitchenware.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ) : (
            // INSTRUCTIONS with paging (3 per page)
            <div style={{ position: 'relative', marginBottom: 16 }}>
              {/* Steps */}
              <div style={{ fontSize: 18, paddingLeft: ARROW_PAD, paddingRight: ARROW_PAD }}>
                {visibleSteps.length === 0 ? (
                  <div>No steps yet.</div>
                ) : (
                  visibleSteps.map((step, i) => (
                    <div key={start + i} style={{ marginBottom: 12 }}>
                      <b>{start + i + 1}.</b> {step}
                    </div>
                  ))
                )}
              </div>

              {/* Pager controls */}
              {totalPages > 1 && (
                <>
                  <button
                    type="button"
                    className="step-pager-btn"
                    onClick={() => setStepPage(p => Math.max(0, p - 1))}
                    disabled={stepPage === 0}
                    aria-label="Previous steps"
                    style={{
                      position: 'absolute',
                      left: -ARROW_OFFSET,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: ARROW_SIZE,
                      height: ARROW_SIZE,
                      cursor: stepPage === 0 ? 'default' : 'pointer',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <img
                      src="/assets/icons/arrow-left.png"
                      alt=""
                      aria-hidden="true"
                      draggable={false}
                      style={{
                        width: ARROW_SIZE,
                        height: ARROW_SIZE,
                        display: 'block',
                        pointerEvents: 'none',
                        filter: stepPage === 0 ? 'grayscale(1) opacity(0.5)' : 'none',
                      }}
                    />
                  </button>

                  <button
                    type="button"
                    className="step-pager-btn"
                    onClick={() => setStepPage(p => Math.min(p + 1, totalPages - 1))}
                    disabled={stepPage >= totalPages - 1}
                    aria-label="Next steps"
                    style={{
                      position: 'absolute',
                      right: -ARROW_OFFSET,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: ARROW_SIZE,
                      height: ARROW_SIZE,
                      cursor: stepPage >= totalPages - 1 ? 'default' : 'pointer',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <img
                      src="/assets/icons/arrow-right.png"
                      alt=""
                      aria-hidden="true"
                      draggable={false}
                      style={{
                        width: ARROW_SIZE,
                        height: ARROW_SIZE,
                        display: 'block',
                        pointerEvents: 'none',
                        filter: stepPage >= totalPages - 1 ? 'grayscale(1) opacity(0.5)' : 'none',
                      }}
                    />
                  </button>

                  <div style={{ textAlign: 'center', marginTop: 8, fontWeight: 700 }}>
                    {stepPage + 1} / {totalPages}
                  </div>
                </>
              )}

              {/* ✅ Complete button (only on last page) */}
              {onLastPage && (recipe.steps?.length ?? 0) > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
                  <button
                    type="button"
                    onClick={() => navigate('/reward')}
                    style={{
                      background: '#4FB9AF',
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: 14,
                      border: 'none',
                      borderRadius: 999,
                      padding: '8px 16px',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                      cursor: 'pointer',
                    }}
                  >
                    Complete!
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mascot & chat bubble */}
        <div
          style={{
            width: "100%",
            height: 140,
            display: "flex",
            alignItems: "flex-end",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/1f527ec0b78f232737bb9fbd9fd471e48872c6b6?width=250"
            alt="Mascot"
            style={{
              width: 110,
              height: 110,
              marginLeft: 10,
              marginBottom: 8,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              marginLeft: 14,
              background: "#E6E6E6",
              borderRadius: 12,
              padding: "16px 20px 14px 40px",
              minWidth: 180,
              boxShadow: "0 2px 8px #0002",
              pointerEvents: "auto",
              position: "relative",
            }}
          >
            <svg
              style={{ position: "absolute", left: "-24px", bottom: 8, width: 32, height: 28 }}
              width="23"
              height="29"
              viewBox="0 0 23 29"
              fill="none"
            >
              <path
                d="M1.59798 16.8515C-0.136603 15.6595 -0.136604 13.0985 1.59798 11.9065L18.0892 0.573925C20.0798 -0.793956 22.7883 0.631165 22.7883 3.04641L22.7883 25.7116C22.7883 28.1268 20.0798 29.552 18.0892 28.1841L1.59798 16.8515Z"
                fill="#E6E6E6"
              />
            </svg>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
              Would you like alternative ingredients options?
            </div>
            <div style={{ fontSize: 14, marginBottom: 2 }}>
              Suggestion: Make this recipe vegan friendly.
            </div>
            <div
              style={{
                color: "#FB2F2F",
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Chat to me now!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
