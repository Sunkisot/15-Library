
import LcText from './components/viewText';

const components = [
  LcText
];

const install = (app, options) => {
  components.forEach(item => {
      app.use(item);
  });
  return app;
};

export default {
  LcText
}