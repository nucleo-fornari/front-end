import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './loginPage';
import ProfessorPage from '../views/professor/professorView';
import SecretariaPage from '../views/secretary/secretaryView';
import ResponsaveisPage from '../views/parents/parentsView';
import PrivateRoute from './privateRoute'; // Rota protegida

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/professor/" component={ProfessorPage} />
        <PrivateRoute path="/secretaria" component={SecretariaPage} />
        <PrivateRoute path="/responsaveis" component={ResponsaveisPage} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}

export default Routes;