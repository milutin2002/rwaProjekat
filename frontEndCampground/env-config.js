const fs = require('fs');
const dotenv = require('dotenv');


dotenv.config();

const targetPath = `./src/environments/environment.ts`;
const targetProdPath = `./src/environments/environment.prod.ts`;


const envConfig = `export const environment = {
  production: false,
  googleMapsApiKey: '${process.env.GOOGLE_MAPS_API_KEY}'
};
`;


fs.writeFileSync(targetPath, envConfig);
fs.writeFileSync(targetProdPath, envConfig);

console.log(`Environment files generated successfully.`);
