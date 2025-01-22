import { uuidV4 } from './get-uuid-v4';

describe('@slabs/ds-utils/get-uuid-v4', () => {
    it('should generate unique UUIDs', () => {
        const uuidSet = new Set();

        // Generate multiple UUIDs and add them to a set
        for (let i = 0; i < 1000; i++) {
            const generatedUuid = uuidV4();
            uuidSet.add(generatedUuid);
        }

        // Check that all generated UUIDs are unique
        expect(uuidSet.size).toBe(1000);
    });

    it('should generate a UUID with the correct length', () => {
        const generatedUuid = uuidV4();
        expect(generatedUuid.length).toBe(36);
    });
});
