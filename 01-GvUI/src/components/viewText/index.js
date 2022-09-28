import LcText from './src/viewText.vue';
LcText.install = (app, options) => {
    app.component(LcText.name, LcText);
    return app;
};

export default LcText;
