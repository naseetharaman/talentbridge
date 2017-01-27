const crypto = require('crypto'),
    debug = require('util').debuglog('lib::utils');

const createHash = crypto.createHash,
    getHashes = crypto.getHashes,
    hashList = getHashes(),
    DEFAULT_HASH_METHOD = 'sha512';

module.exports = {
    createHash: (data, hashMethod) => {
        if (!hashList.toString().includes(hashMethod)){
            debug(`WARNING: REQUESTED HASH (${hashMethod}) NOT SUPPORTED, FALLING BACK TO ${DEFAULT_HASH_METHOD}`);
            hashMethod = DEFAULT_HASH_METHOD;
        }
        const hash = createHash(hashMethod);
        hash.update(data);
        const hashedData = hash.digest('hex');
        return hashedData
    }
};
