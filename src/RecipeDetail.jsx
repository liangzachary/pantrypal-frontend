import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('instructions');
  const [servings, setServings] = useState(1);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/recipes/${id}`);
        if (!response.ok) {
          throw new Error('Recipe not found');
        }
        const data = await response.json();
        setRecipe(data);
        setServings(data.servings || 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  const adjustServings = (increment) => {
    setServings(prev => Math.max(1, prev + increment));
  };

  if (loading) {
    return (
      <div className="w-[375px] h-[812px] bg-[#EDD7B3] flex items-center justify-center">
        <div className="text-black text-xl">Loading recipe...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-[375px] h-[812px] bg-[#EDD7B3] flex items-center justify-center">
        <div className="text-red-600 text-xl">Error: {error}</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="w-[375px] h-[812px] bg-[#EDD7B3] flex items-center justify-center">
        <div className="text-black text-xl">Recipe not found</div>
      </div>
    );
  }

  return (
    <div style={{width: '375px', height: '812px', background: '#EDD7B3', position: 'relative'}}>
      {/* Gray background section */}
      <div style={{
        width: '375px',
        height: '398px',
        background: '#D9D9D9',
        position: 'absolute',
        left: '0px',
        top: '-72px'
      }}></div>
      
      {/* Hero image */}
      <img 
        style={{
          width: '516px',
          height: '337px',
          position: 'absolute',
          left: '-82px',
          top: '-11px',
          objectFit: 'cover'
        }}
        src={recipe.image || "https://api.builder.io/api/v1/image/assets/TEMP/05348006be7f6569f0bb31bbf78d1634bd98b418?width=1032"}
        alt={recipe.nickname || recipe.real_name}
      />
      
      {/* Main content card */}
      <div style={{
        width: '375px',
        height: '606px',
        borderRadius: '50px',
        background: '#EDD7B3',
        position: 'absolute',
        left: '0px',
        top: '280px'
      }}>
        
        {/* Recipe title - Crimson Sunset */}
        <div style={{
          width: '244px',
          height: '32px',
          color: '#000',
          fontSize: '32px',
          fontWeight: '900',
          lineHeight: 'normal',
          position: 'absolute',
          left: '61px',
          top: '46px'
        }}>
          {recipe.nickname || 'Crimson Sunset'}
        </div>
        
        {/* Recipe subtitle */}
        <div style={{
          width: '164px',
          height: '128px',
          color: '#000',
          fontSize: '20px',
          fontWeight: '400',
          lineHeight: 'normal',
          position: 'absolute',
          left: '106px',
          top: '83px'
        }}>
          {recipe.real_name || 'Chilli oil fried egg'}
        </div>
        
        {/* Time info */}
        <div style={{
          width: '302px',
          height: '26px',
          color: '#000',
          fontSize: '15px',
          fontWeight: '400',
          lineHeight: 'normal',
          position: 'absolute',
          left: '54px',
          top: '120px'
        }}>
          {recipe.time || '10mins'}
        </div>
        
        {/* Serving info */}
        <div style={{
          width: '302px',
          height: '20px',
          color: '#000',
          fontSize: '15px',
          fontWeight: '400',
          lineHeight: 'normal',
          position: 'absolute',
          left: '176px',
          top: '120px'
        }}>
          {servings} serving{servings !== 1 ? 's' : ''}
        </div>
        
        {/* Time icon */}
        <img style={{
          width: '26px',
          height: '26px',
          position: 'absolute',
          left: '22px',
          top: '113px'
        }} src="https://api.builder.io/api/v1/image/assets/TEMP/96c8ccf032344656716aafa24d2a0d786adf181b?width=52" alt="" />
        
        {/* People icon */}
        <img style={{
          width: '60px',
          height: '46px',
          position: 'absolute',
          left: '123px',
          top: '103px'
        }} src="https://api.builder.io/api/v1/image/assets/TEMP/791b59fa3cb38bee2d863c91c102b914635c0703?width=120" alt="" />
        
        {/* Orange serving adjustment background */}
        <div style={{
          width: '61px',
          height: '19px',
          borderRadius: '20px',
          background: '#FE9A1C',
          position: 'absolute',
          left: '252px',
          top: '120px'
        }}></div>
        
        {/* Plus button */}
        <button 
          onClick={() => adjustServings(1)}
          style={{
            width: '11px',
            height: '11px',
            position: 'absolute',
            left: '258px',
            top: '124px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M0 5.5H11M5.5 0V11" stroke="black" strokeWidth="2"/>
          </svg>
        </button>
        
        {/* Minus button */}
        <button 
          onClick={() => adjustServings(-1)}
          style={{
            width: '11px',
            height: '0px',
            position: 'absolute',
            left: '297px',
            top: '130px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <svg width="12" height="2" viewBox="0 0 12 2" fill="none">
            <path d="M0.5 1H11.5" stroke="black" strokeWidth="2"/>
          </svg>
        </button>
        
        {/* Ingredients tab button */}
        <div style={{
          width: '140px',
          height: '37px',
          borderRadius: '20px',
          border: '2px solid #4FB9AF',
          background: activeTab === 'ingredients' ? '#4FB9AF' : 'transparent',
          position: 'absolute',
          left: '35px',
          top: '164px'
        }}>
          <button 
            onClick={() => setActiveTab('ingredients')}
            style={{
              width: '100%',
              height: '100%',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: '106px',
              height: '20px',
              color: activeTab === 'ingredients' ? '#FFF' : '#000',
              fontSize: '18px',
              fontWeight: '700',
              lineHeight: 'normal',
              textAlign: 'center'
            }}>
              Ingredients
            </div>
          </button>
        </div>
        
        {/* Instructions tab button */}
        <div style={{
          width: '140px',
          height: '37px',
          borderRadius: '20px',
          background: activeTab === 'instructions' ? '#4FB9AF' : 'transparent',
          border: activeTab === 'instructions' ? 'none' : '2px solid #4FB9AF',
          position: 'absolute',
          left: '199px',
          top: '163px'
        }}>
          <button 
            onClick={() => setActiveTab('instructions')}
            style={{
              width: '100%',
              height: '100%',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: '106px',
              height: '20px',
              color: activeTab === 'instructions' ? '#FFF' : '#000',
              fontSize: '18px',
              fontWeight: '700',
              lineHeight: 'normal',
              textAlign: 'center'
            }}>
              Instructions
            </div>
          </button>
        </div>
        
        {/* Content area */}
        {activeTab === 'ingredients' ? (
          <>
            {/* Ingredients list */}
            <div style={{
              width: '139px',
              height: '126px',
              color: '#000',
              fontSize: '18px',
              fontWeight: '400',
              lineHeight: '22px',
              position: 'absolute',
              left: '18px',
              top: '223px'
            }}>
              {recipe.ingredients ? (
                recipe.ingredients.map((ingredient, index) => (
                  <div key={index}>{ingredient}</div>
                ))
              ) : (
                <>
                  1 large egg<br/>
                  1ts Chilli oil<br/>
                  1ts salt
                </>
              )}
            </div>
            
            {/* Equipment list */}
            <div style={{
              width: '261px',
              height: '126px',
              color: '#000',
              fontSize: '18px',
              fontWeight: '400',
              lineHeight: '22px',
              position: 'absolute',
              left: '199px',
              top: '223px'
            }}>
              Non-stick pan<br/>
              Spatula
            </div>
          </>
        ) : (
          /* Instructions content */
          <div style={{
            color: '#000',
            fontSize: '18px',
            fontWeight: '400',
            lineHeight: '22px',
            position: 'absolute',
            left: '18px',
            top: '223px',
            right: '18px'
          }}>
            {recipe.steps ? (
              recipe.steps.map((step, index) => (
                <div key={index} style={{marginBottom: '16px'}}>
                  <span style={{fontWeight: 'bold'}}>{index + 1}. </span>
                  {step}
                </div>
              ))
            ) : (
              <>
                <div style={{marginBottom: '16px'}}>
                  <span style={{fontWeight: 'bold'}}>1. </span>
                  Heat a non-stick pan over medium heat and add the chilli oil.
                </div>
                <div style={{marginBottom: '16px'}}>
                  <span style={{fontWeight: 'bold'}}>2. </span>
                  Crack the egg into the pan and season with salt.
                </div>
                <div style={{marginBottom: '16px'}}>
                  <span style={{fontWeight: 'bold'}}>3. </span>
                  Cook until the white is set but the yolk is still runny, about 2-3 minutes.
                </div>
                <div style={{marginBottom: '16px'}}>
                  <span style={{fontWeight: 'bold'}}>4. </span>
                  Serve immediately while hot.
                </div>
              </>
            )}
          </div>
        )}
        
        {/* Mascot character */}
        <img style={{
          width: '125px',
          height: '200px',
          position: 'absolute',
          left: '10px',
          top: '389px'
        }} src="https://api.builder.io/api/v1/image/assets/TEMP/1f527ec0b78f232737bb9fbd9fd471e48872c6b6?width=250" alt="" />
        
        {/* Chat bubble container */}
        <div style={{
          width: '233px',
          height: '124px',
          position: 'absolute',
          left: '120px',
          top: '381px'
        }}>
          {/* Chat bubble background */}
          <div style={{
            width: '213px',
            height: '124px',
            borderRadius: '10px',
            background: '#E6E6E6',
            position: 'absolute',
            left: '21px',
            top: '0px'
          }}></div>
          
          {/* Speech bubble tail */}
          <svg style={{
            position: 'absolute',
            left: '0px',
            top: '59px',
            width: '39px',
            height: '33px'
          }} width="23" height="29" viewBox="0 0 23 29" fill="none">
            <path d="M1.59798 16.8515C-0.136603 15.6595 -0.136604 13.0985 1.59798 11.9065L18.0892 0.573925C20.0798 -0.793956 22.7883 0.631165 22.7883 3.04641L22.7883 25.7116C22.7883 28.1268 20.0798 29.552 18.0892 28.1841L1.59798 16.8515Z" fill="#E6E6E6"/>
          </svg>
        </div>
        
        {/* Chat text content */}
        <div style={{
          width: '179px',
          height: '39px',
          color: '#000',
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: '700',
          lineHeight: '16px',
          position: 'absolute',
          left: '162px',
          top: '400px'
        }}>
          Would you like alternative ingredients options?
        </div>
        
        <div style={{
          width: '179px',
          height: '39px',
          color: '#000',
          fontSize: '13px',
          fontWeight: '400',
          lineHeight: '14px',
          position: 'absolute',
          left: '162px',
          top: '439px'
        }}>
          Suggestion: Make this recipe vegan friendly.
        </div>
        
        <div style={{
          width: '149px',
          height: '90px',
          color: '#FB2F2F',
          fontSize: '14px',
          fontWeight: '700',
          lineHeight: '16px',
          textDecoration: 'underline',
          position: 'absolute',
          left: '190px',
          top: '476px',
          cursor: 'pointer'
        }}>
          Chat to me now!
        </div>
        
        {/* Teal line separator */}
        <div style={{
          width: '67px',
          height: '0px',
          background: '#4FB9AF',
          position: 'absolute',
          left: '188px',
          top: '219px'
        }}></div>
      </div>
    </div>
  );
};

export default RecipeDetail;
