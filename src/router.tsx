import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import your route components too
import App from './App'
import { rawCountries } from "./raw-data";
import { Page } from "./page";
import ZustandDemo from './zustand';
import { useEffect } from 'react';

type Country = {
    id: string;
    name: string;
  };
  const getCountriesFromRawData = (raw: any[]): Country[] => {
    return raw.map((value: any) => ({
      __typename: "country",
      name: String(value.name.common),
      id: String(value.cca2).toLowerCase(),
      independent: Boolean(value.independent),
      unMember: Boolean(value.unMember),
      flagUrl: `https://flagcdn.com/${String(value.cca2).toLowerCase()}.svg`,
      region: String(value.region),
      capital: value.capital.length ? String(value.capital[0]) : "",
      subregion: String(value.subregion)
    }));
  };
  

function Router() {
	
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={<App />}
				>
					<Route
						index
						element={<Page countries={getCountriesFromRawData(rawCountries)} />}
					/>
                    <Route
						path='/zustand'
						element={<ZustandDemo />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Router;
