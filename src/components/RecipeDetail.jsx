import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('instructions');
  const [servings, setServings] = useState(1);

  // Fallback image (egg) URL
  const fallbackImg =
    'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2F2023-07-chili-crisp-fried-eggs%2FChili-Crisp-Fried-Eggs_153';

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://spatch.onrender.com/recipes/${id}`);
        if (!response.ok) throw new Error('Recipe not found');
        const data = await response.json();
        setRecipe(data);
        setServings(data.servings || 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRecipe();
  }, [id]);

  const adjustServings = (increment) => {
    setServings((prev) => Math.max(1, prev + increment));
  };

  if (loading) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          background: '#EDD7B3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="text-black text-xl">Loading recipe...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          background: '#EDD7B3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="text-red-600 text-xl">Error: {error}</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          background: '#EDD7B3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="text-black text-xl">Recipe not found</div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: 375,
        height: 812,
        background: '#EDD7B3',
        position: 'relative',
        margin: '0 auto',
        overflow: 'hidden',
        borderRadius: 40,
        boxShadow: '0 2px 20px #0001',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Hero image */}
      <img
        style={{
          width: 375,
          height: 350,
          objectFit: 'cover',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}
        src={recipe.imgUrl || fallbackImg}
        alt={recipe.nickname || recipe.real_name}
      />

      {/* Main content area */}
      <div
        style={{
          flex: 1,
          background: '#EDD7B3',
          position: 'relative',
          padding: '36px 16px 0 16px',
          overflowY: 'auto',
        }}
      >
        {/* Recipe title */}
        <div
          style={{
            color: '#000',
            fontSize: 32,
            fontWeight: 900,
            textAlign: 'center',
            marginBottom: 4,
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
          }}
        >
          {recipe.real_name || 'Chilli oil fried egg'}
        </div>
        {/* Time and servings */}
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
              style={{
                width: 24,
                verticalAlign: 'middle',
                marginRight: 4,
                marginTop: -2,
              }}
            />
            {recipe.time || 10} mins
          </span>
          <span>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/791b59fa3cb38bee2d863c91c102b914635c0703?width=120"
              alt="people"
              style={{
                width: 32,
                verticalAlign: 'middle',
                marginRight: 4,
                marginTop: -2,
              }}
            />
            {servings} serving{servings !== 1 ? 's' : ''}
          </span>
          <span>
            <button
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
              {(recipe.ingredients || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <ul style={{ listStyle: 'disc', paddingLeft: 24 }}>
              {(recipe.kitchenware || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div style={{ fontSize: 18, marginBottom: 16 }}>
            {(recipe.steps || []).map((step, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <b>{i + 1}.</b> {step}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mascot & chat bubble pinned to bottom */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 140,
          display: 'flex',
          alignItems: 'flex-end',
          pointerEvents: 'none',
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
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            marginLeft: 14,
            background: '#E6E6E6',
            borderRadius: 12,
            padding: '16px 20px 14px 40px',
            minWidth: 180,
            boxShadow: '0 2px 8px #0002',
            pointerEvents: 'auto',
            position: 'relative',
          }}
        >
          {/* Bubble tail */}
          <svg
            style={{
              position: 'absolute',
              left: '-24px',
              bottom: 8,
              width: 32,
              height: 28,
            }}
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
              color: '#FB2F2F',
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            Chat to me now!
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
