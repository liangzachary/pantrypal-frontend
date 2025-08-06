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
      <div className="min-h-screen bg-[#EDD7B3] flex items-center justify-center">
        <div className="text-black text-xl">Loading recipe...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#EDD7B3] flex items-center justify-center">
        <div className="text-red-600 text-xl">Error: {error}</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-[#EDD7B3] flex items-center justify-center">
        <div className="text-black text-xl">Recipe not found</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[375px] h-[812px] bg-[#EDD7B3] relative mx-auto overflow-hidden">
      {/* Top gray section */}
      <div className="w-full h-[398px] bg-[#D9D9D9] absolute left-0 -top-[72px]"></div>
      
      {/* Hero image */}
      <img 
        className="w-[516px] h-[337px] absolute -left-[82px] -top-[11px] object-cover"
        src={recipe.image || "https://api.builder.io/api/v1/image/assets/TEMP/05348006be7f6569f0bb31bbf78d1634bd98b418?width=1032"}
        alt={recipe.nickname || recipe.real_name}
      />
      
      {/* Main content card */}
      <div className="w-full h-[606px] rounded-t-[50px] bg-[#EDD7B3] absolute left-0 top-[280px] overflow-y-auto">
        {/* Recipe title */}
        <div className="w-[244px] h-8 absolute left-[61px] top-[46px]">
          <span className="text-black font-bold text-[32px] leading-normal">
            {recipe.nickname || 'Recipe Name'}
          </span>
        </div>
        
        {/* Recipe subtitle */}
        <div className="w-[164px] h-32 absolute left-[106px] top-[83px]">
          <span className="text-black text-[20px] leading-normal">
            {recipe.real_name || 'Recipe Description'}
          </span>
        </div>
        
        {/* Time and serving info */}
        <div className="absolute left-[54px] top-[120px]">
          <span className="text-black text-[15px] leading-normal">
            {recipe.time || '10mins'}
          </span>
        </div>
        
        <div className="absolute left-[176px] top-[120px]">
          <span className="text-black text-[15px] leading-normal">
            {servings} serving{servings !== 1 ? 's' : ''}
          </span>
        </div>
        
        {/* Time icon */}
        <img 
          className="w-[26px] h-[26px] absolute left-[22px] top-[113px]"
          src="https://api.builder.io/api/v1/image/assets/TEMP/96c8ccf032344656716aafa24d2a0d786adf181b?width=52"
          alt="Time icon"
        />
        
        {/* People icon */}
        <img 
          className="w-[60px] h-[46px] absolute left-[123px] top-[103px]"
          src="https://api.builder.io/api/v1/image/assets/TEMP/791b59fa3cb38bee2d863c91c102b914635c0703?width=120"
          alt="Servings icon"
        />
        
        {/* Serving adjustment controls */}
        <div className="w-[61px] h-[19px] rounded-[20px] bg-[#FE9A1C] absolute left-[252px] top-[120px]"></div>
        
        {/* Plus button */}
        <button 
          onClick={() => adjustServings(1)}
          className="absolute left-[258px] top-[124px] w-[11px] h-[11px]"
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M0 5.5H11M5.5 0V11" stroke="black" strokeWidth="2"/>
          </svg>
        </button>
        
        {/* Minus button */}
        <button 
          onClick={() => adjustServings(-1)}
          className="absolute left-[297px] top-[130px] w-[11px] h-0"
        >
          <svg width="12" height="2" viewBox="0 0 12 2" fill="none">
            <path d="M0.5 1H11.5" stroke="black" strokeWidth="2"/>
          </svg>
        </button>
        
        {/* Tab buttons */}
        <div className="absolute left-[35px] top-[164px]">
          <button 
            onClick={() => setActiveTab('ingredients')}
            className={`w-[140px] h-[37px] rounded-[20px] border-2 border-[#4FB9AF] ${
              activeTab === 'ingredients' ? 'bg-[#4FB9AF]' : 'bg-transparent'
            }`}
          >
            <span className={`text-[18px] font-bold ${
              activeTab === 'ingredients' ? 'text-white' : 'text-black'
            }`}>
              Ingredients
            </span>
          </button>
        </div>
        
        <div className="absolute left-[199px] top-[163px]">
          <button 
            onClick={() => setActiveTab('instructions')}
            className={`w-[140px] h-[37px] rounded-[20px] ${
              activeTab === 'instructions' ? 'bg-[#4FB9AF]' : 'border-2 border-[#4FB9AF] bg-transparent'
            }`}
          >
            <span className={`text-[18px] font-bold ${
              activeTab === 'instructions' ? 'text-white' : 'text-black'
            }`}>
              Instructions
            </span>
          </button>
        </div>
        
        {/* Content area */}
        <div className="absolute top-[220px] left-0 right-0 bottom-[120px] px-4 overflow-y-auto">
          {activeTab === 'ingredients' ? (
            <div className="space-y-4">
              <div className="absolute left-[18px] top-[3px] w-[139px]">
                <div className="text-black text-[18px] leading-[22px]">
                  {recipe.ingredients ? (
                    recipe.ingredients.map((ingredient, index) => (
                      <div key={index} className="mb-2">
                        {ingredient}
                      </div>
                    ))
                  ) : (
                    <>
                      1 large egg<br/>
                      1ts Chilli oil<br/>
                      1ts salt
                    </>
                  )}
                </div>
              </div>
              
              <div className="absolute left-[199px] top-[3px] w-[161px]">
                <div className="text-black text-[18px] leading-[22px]">
                  Non-stick pan<br/>
                  Spatula
                </div>
              </div>
            </div>
          ) : (
            <div className="px-4">
              <div className="text-black text-[18px] leading-[22px]">
                {recipe.steps ? (
                  recipe.steps.map((step, index) => (
                    <div key={index} className="mb-4">
                      <span className="font-bold">{index + 1}. </span>
                      {step}
                    </div>
                  ))
                ) : (
                  <>
                    <div className="mb-4">
                      <span className="font-bold">1. </span>
                      Heat a non-stick pan over medium heat and add the chilli oil.
                    </div>
                    <div className="mb-4">
                      <span className="font-bold">2. </span>
                      Crack the egg into the pan and season with salt.
                    </div>
                    <div className="mb-4">
                      <span className="font-bold">3. </span>
                      Cook until the white is set but the yolk is still runny, about 2-3 minutes.
                    </div>
                    <div className="mb-4">
                      <span className="font-bold">4. </span>
                      Serve immediately while hot.
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Bottom mascot and chat section */}
        <div className="absolute bottom-0 left-0 right-0 h-[120px]">
          {/* Mascot character */}
          <img 
            className="w-[125px] h-[200px] absolute left-[10px] -bottom-[80px]"
            src="https://api.builder.io/api/v1/image/assets/TEMP/1f527ec0b78f232737bb9fbd9fd471e48872c6b6?width=250"
            alt="Mascot character"
          />
          
          {/* Chat bubble */}
          <div className="w-[233px] h-[124px] absolute left-[120px] bottom-[40px]">
            <div className="w-[213px] h-[124px] rounded-[10px] bg-[#E6E6E6] absolute left-[21px] top-0"></div>
            
            {/* Speech bubble tail */}
            <svg 
              className="absolute left-0 top-[59px] w-[39px] h-[33px]" 
              width="23" height="29" 
              viewBox="0 0 23 29" 
              fill="none"
            >
              <path 
                d="M1.59798 16.8515C-0.136603 15.6595 -0.136604 13.0985 1.59798 11.9065L18.0892 0.573925C20.0798 -0.793956 22.7883 0.631165 22.7883 3.04641L22.7883 25.7116C22.7883 28.1268 20.0798 29.552 18.0892 28.1841L1.59798 16.8515Z" 
                fill="#E6E6E6"
              />
            </svg>
            
            {/* Chat text */}
            <div className="absolute left-[162px] top-[19px] w-[179px]">
              <div className="text-black text-center text-[14px] font-bold leading-[16px] mb-2">
                Would you like alternative ingredients options?
              </div>
              
              <div className="text-black text-[13px] leading-[14px] mb-2">
                Suggestion: Make this recipe vegan friendly.
              </div>
              
              <div className="text-[#FB2F2F] text-[14px] font-bold leading-[16px] underline">
                Chat to me now!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
