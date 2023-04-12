import React from "react";

// components
import Form from "components/Form";

const HomePageComponent: React.FC = () => {
  return (
    <div>
      <div className="relative grid">
        <div className="grid grid-cols-1 w-screen max-w-[800px]">
          <div className="lg:ml-12 mt-5">
            <div className="bg-white rounded-lg border border-gray-400 h-fit shadow-xl p-4">
              {/* image */}
              <Form formId="broken-test-page-form" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageComponent;
