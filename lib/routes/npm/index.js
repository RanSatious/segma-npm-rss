// const config = require('@/config').value;
// const cacheIndex = 0;
const got = require('@/utils/got');

module.exports = async (ctx) => {
    const origin = 'http://npm.segma.tech';
    let result = await got({
        method: 'get',
        url: `${origin}/-/verdaccio/packages`,
    });
    result = JSON.parse(result.body);
    const item = result.map((d) => {
        const { name: title, version, description, time } = d;
        const date = new Date(time);
        return {
            title: `${title} - ${version} 于 ${date.toLocaleDateString()} ${date.toTimeString().split(' ')[0]}`,
            description,
            pubDate: new Date(date.getTime() + 1000 * 60).toUTCString(),
            link: `${origin}/${title}`,
            author: 'Segma FED',
        };
    });

    ctx.state.data = {
        title: `Segma npm`,
        itunes_author: 'Segma FED',
        link: origin,
        item,
    };
};
