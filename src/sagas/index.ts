import { tabsSaga } from './tabsSaga';
import { tasksSaga } from './tasksSaga';
import { notesSaga } from './notesSaga';
import { layoutSaga } from './layoutSaga';
import { apiSaga } from './apiSaga';

const sagas = [tabsSaga, tasksSaga, notesSaga, layoutSaga, apiSaga];

export const runSagas = (middleware: { run: Function }) => sagas.map((saga) => middleware.run(saga));
