import axios from 'axios';

const baseURL = 'https://dev.azure.com/{organization}/{project}/_apis/pipelines/{pipelineId}/runs?api-version=6.0-preview.1';

export const fetchPipelineRuns = async (definitionId: number) => {
    const response = await axios.get(baseURL.replace('{pipelineId}', definitionId.toString()));
    return response.data.value;
};
