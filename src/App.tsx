import CountryTable from "./components/table/CountryTable";
import FormAddMedals from "./components/form/FormAddMedals";
import TemplatePanel from "./common/TemplatePanel";

const App = () => {
  return (
    <>
      <div className="mt-6 text-center text-4xl font-semibold">
        Interview task
      </div>
      <TemplatePanel>
        <FormAddMedals />
        <CountryTable />
      </TemplatePanel>
    </>
  );
};

export default App;
