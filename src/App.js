import logo from './logo.svg';
import './App.css';
import Generateworkout from './Components/generate-component'
import ViewMembersInfo from './Components/ViewMembersInfo';
import GetMemberInfo from './Components/GetMemberInfo';
function App() {
  return (
    <div className="App">
      <div> AK FIT </div>
      <Generateworkout/>
      <GetMemberInfo/>
      <ViewMembersInfo/>

    </div>
  );
}

export default App;
