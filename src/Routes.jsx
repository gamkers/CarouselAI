import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import LandingPage from "pages/landing-page";
import QuestionnaireFlow from "pages/questionnaire-flow";
import ContentGenerationPreview from "pages/content-generation-preview";
import DownloadCompletion from "pages/download-completion";
import ErrorFallbackStates from "pages/error-fallback-states";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/questionnaire-flow" element={<QuestionnaireFlow />} />
          <Route path="/content-generation-preview" element={<ContentGenerationPreview />} />
          <Route path="/download-completion" element={<DownloadCompletion />} />
          <Route path="/error-fallback-states" element={<ErrorFallbackStates />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;