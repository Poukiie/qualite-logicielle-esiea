module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: ['features/steps/**/*.ts'],
        paths: ['features/*.feature'],
        format: ['progress-bar', 'summary']
    }
}