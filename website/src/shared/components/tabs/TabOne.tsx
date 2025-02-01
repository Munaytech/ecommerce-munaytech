"use client";

import { useState, useRef, useEffect } from "react";

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  children: React.ReactNode[];
}

export const TabOne = ({ tabs, children }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: "0px",
    width: "0px",
  });

  const tabRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const activeButton = containerRef.current.querySelector(
        `[data-tab="${activeTab}"]`
      );
      if (activeButton) {
        const { offsetLeft, offsetWidth } = activeButton as HTMLElement;
        setIndicatorStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    }
  }, [activeTab]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setTimeout(() => {
      tabRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="max-w-[1500px] mx-auto p-6">
      {/* Tabs Navigation */}
      <div className="relative border-b">
        <div className=" w-full">
          <div ref={containerRef} className="flex justify-start space-x-6 ">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                data-tab={tab.id}
                className={`px-8 py-2 transition-all duration-300  ${
                  activeTab === tab.id
                    ? "text-red-500 font-semibold"
                    : "text-gray-600"
                }`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.label}
              </button>
            ))}
            {/* Indicador dinámico */}
            <div
              className="absolute bottom-0 h-1 bg-red-500 transition-all duration-300"
              style={indicatorStyle}
            />
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div ref={tabRef} className="pt-4">
        {children[tabs.findIndex((tab) => tab.id === activeTab)]}
      </div>
    </div>
  );
};
