module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: ['features/steps/**/*.ts', 'support/*.ts'],
        paths: ['features/*.feature'],
        format: ['progress-bar', 'summary']
    }
}