import { tabsSaga } from './tabsSaga';
import { tasksSaga } from './tasksSaga';
import { notesSaga } from './notesSaga';

const sagas = [tabsSaga, tasksSaga, notesSaga];

export const runSagas = (middleware: { run: Function }) => sagas.map((saga) => middleware.run(saga));
