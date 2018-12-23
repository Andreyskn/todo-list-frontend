import { tabsSaga } from './tabsSaga';
import { tasksSaga } from './tasksSaga';
import { notesSaga } from './notesSaga';
import { layoutSaga } from './layoutSaga';

const sagas = [tabsSaga, tasksSaga, notesSaga, layoutSaga];

export const runSagas = (middleware: { run: Function }) => sagas.map((saga) => middleware.run(saga));
