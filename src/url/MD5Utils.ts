import * as crypto from 'crypto';

export default class MD5Utils {
    private static SHORT_URL_CHAR_SIZE: number = 7; // Define the size of the short URL

    // Method to convert a long URL to an MD5 hash
    public static convert(longURL: string): string {
        try {
            // Create MD5 Hash
            const digest = crypto.createHash('md5');
            digest.update(longURL);
            const hash: Buffer = digest.digest();

            // Create Hex String representation of the hash
            let hexString: string = '';
            for (const b of hash) {
                hexString += (b & 0xFF).toString(16).padStart(2, '0');
            }
            return hexString;
        } catch (error) {
            throw new Error(error);
        }
    }

    // Method to generate a random short URL from a long URL
    public static generateRandomShortUrl(longURL: string): string {
        // Convert the long URL to an MD5 hash
        const hash: string = MD5Utils.convert(longURL);
        const numberOfCharsInHash: number = hash.length;
        let counter: number = 0;

        // Iterate through the hash to find a unique substring for the short URL
        while (counter < numberOfCharsInHash - MD5Utils.SHORT_URL_CHAR_SIZE) {
            const substring: string = hash.substring(counter, counter + MD5Utils.SHORT_URL_CHAR_SIZE);
            // Check if the substring already exists in the database
            if (!DB.exists(substring)) {
                // If it doesn't exist, return the substring as the short URL
                return substring;
            }
            counter++;
        }
        // If no unique short URL can be generated, throw an error
        throw new Error("Unable to generate unique short URL.");
    }
}

// Mock Database class
class DB {
    public static exists(hash: string): boolean {
        // Your logic to check if the hash exists in the database goes here
        return false; // Assuming it's not existing for now
    }
}

// Example usage
// const longURL: string = "https://example.com";
// const shortURL: string = MD5Utils.generateRandomShortUrl(longURL);
// console.log(shortURL);
