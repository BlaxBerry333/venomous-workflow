import { memo, type NamedExoticComponent } from "react";

const AdminAnalysisPage: NamedExoticComponent = memo(() => {
  return (
    <div>
      AdminAnalysisPage
      <div style={{ height: "200vh" }} />
    </div>
  );
});

AdminAnalysisPage.displayName = "AdminAnalysisPage";
export default AdminAnalysisPage;
