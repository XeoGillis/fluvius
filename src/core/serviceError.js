const NOT_FOUND = 'NOT_FOUND';
const VALIDATION_FAILED = 'VALIDATION_FAILED';
const UNAUTHORIZED = 'UNAUTHORIZED';
const FORBIDDEN = 'FORBIDDEN';

/**
 * @class ServiceError
 */
class ServiceError extends Error {
    /**
     * @constructor
     * @param code 
     * @param message 
     * @param details 
     */
    constructor(code, message, details = {}) {
        super(message);
        this.code = code;
        this.details = details;
        this.name = 'ServiceError';
    }

    /**
     * 
     * @param message 
     * @param details 
     * @returns {NOT_FOUND} 
     */
    static notFound(message, details) {
        return new ServiceError(NOT_FOUND, message, details);
    }

    /**
     * 
     * @param message 
     * @param details 
     * @returns {VALIDATION_FAILED} 
     */
    static validationFailed(message, details) {
        return new ServiceError(VALIDATION_FAILED, message, details);
    }

    /**
     * 
     * @param message 
     * @param details 
     * @returns {UNAUTHORIZED} 
     */
    static unauthorized(message, details) {
        return new ServiceError(UNAUTHORIZED, message, details);
    }

    /**
     * 
     * @param message 
     * @param details 
     * @returns {FORBIDDEN} 
     */
    static forbidden(message, details) {
        return new ServiceError(FORBIDDEN, message, details);
    }

    /**
     * @returns {boolean}
     */
    get isNotFound() {
        return this.code === NOT_FOUND;
    }

    /**
     * @returns {boolean}
     */
    get isValidationFailed() {
        return this.code === VALIDATION_FAILED;
    }

    /**
     * @returns {boolean}
     */
    get isUnauthorized() {
        return this.code === UNAUTHORIZED;
    }

    /**
     * @returns {boolean}
     */
    get isForbidden() {
        return this.code === FORBIDDEN;
    }
}

module.exports = ServiceError;