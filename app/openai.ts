// openai.ts
import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";

// Create the Azure AD credential
const credential = new DefaultAzureCredential();
const scope = "https://cognitiveservices.azure.com/.default";
const azureADTokenProvider = getBearerTokenProvider(credential, scope);

// Retrieve endpoint, deployment name, and API version from environment variables
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;
const apiVersion = process.env.AZURE_OPENAI_API_VERSION || "2024-07-01-preview";

// Ensure all required environment variables are set
if (!endpoint || !deployment) {
  throw new Error("Missing Azure OpenAI configuration in environment variables.");
}

// Create the AzureOpenAI client
export const openai = new AzureOpenAI({
  azureADTokenProvider,
  endpoint,
  deployment,
  apiVersion,
});
