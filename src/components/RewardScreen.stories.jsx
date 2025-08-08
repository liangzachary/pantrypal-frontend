import React from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import RewardScreen from "./RewardScreen";

export default {
  title: "Screens/RewardScreen",
  component: RewardScreen,
  parameters: {
    // Fill the canvas like a real page
    layout: "fullscreen",
    // If you have @storybook/addon-viewport, this sets a nice mobile preview
    viewport: { defaultViewport: "iphone14" },
  },
  argTypes: {
    // Simulate the bottom nav's reserved space in px
    navReserve: { control: { type: "number", min: 0, max: 120, step: 4 } },
  },
  decorators: [
    (Story, context) => {
      const reserve = context.args.navReserve ?? 0;
      return (
        <MemoryRouter initialEntries={["/reward"]}>
          {/* Provide the CSS var the screen uses to avoid scrolling into the BottomNav */}
          <div style={{ "--nav-reserve": `${reserve}px` }}>
            <Routes>
              <Route path="/reward" element={<Story />} />
              {/* Simple placeholder so the CTA navigate works during preview */}
              <Route
                path="/breakfast"
                element={
                  <div
                    style={{
                      height: "100vh",
                      display: "grid",
                      placeItems: "center",
                      fontFamily: "system-ui, sans-serif",
                      background: "#F6DFBC",
                    }}
                  >
                    <div>Next route placeholder</div>
                  </div>
                }
              />
              <Route path="*" element={<Story />} />
            </Routes>
          </div>
        </MemoryRouter>
      );
    },
  ],
};

const Template = (args) => <RewardScreen {...args} />;

export const Default = Template.bind({});
Default.args = { navReserve: 0 };

export const WithBottomNavReserve = Template.bind({});
WithBottomNavReserve.args = { navReserve: 64 };
