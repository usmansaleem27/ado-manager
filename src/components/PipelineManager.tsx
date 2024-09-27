import React, { useEffect, useState } from 'react';
import { TextField, Checkbox, PrimaryButton, DetailsList, IColumn, IObjectWithKey, DetailsListLayoutMode } from '@fluentui/react';
import { fetchPipelineRuns } from '../apiservice';

interface PipelineRun {
    id: number;
    name: string;
    status: string;
}

const PipelineManager: React.FC<{ definitionId: number }> = ({ definitionId }) => {
    const [runs, setRuns] = useState<PipelineRun[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    useEffect(() => {
        const getRuns = async () => {
            const data = await fetchPipelineRuns(definitionId);
            setRuns(data);
        };
        getRuns();
    }, [definitionId]);

    const filteredRuns = runs.filter(run => run.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const columns: IColumn[] = [
        {
            key: 'column1',
            name: 'Select',
            fieldName: 'id',
            minWidth: 50,
            maxWidth: 50,
            onRender: (item: PipelineRun) => (
                <Checkbox checked={selectedIds.includes(item.id)} onChange={(ev, checked) => {
                    if (checked) {
                        setSelectedIds([...selectedIds, item.id]);
                    } else {
                        setSelectedIds(selectedIds.filter(id => id !== item.id));
                    }
                }} />
            )
        },
        { key: 'column2', name: 'ID', fieldName: 'id', minWidth: 100, maxWidth: 100, isMultiline: true },
        { key: 'column3', name: 'Name', fieldName: 'name', minWidth: 200, maxWidth: 200, isMultiline: true },
        { key: 'column4', name: 'Status', fieldName: 'status', minWidth: 100, maxWidth: 100, isMultiline: true },
    ];

    const cancelSelected = () => {
        // Implement cancel logic here
        console.log("Canceling runs with IDs:", selectedIds);
    };

    return (
        <div>
            <TextField
                label="Search by name"
                value={searchTerm}
                onChange={(_, newValue) => setSearchTerm(newValue || '')}
            />
            <PrimaryButton text="Cancel Selected" onClick={cancelSelected} disabled={selectedIds.length === 0} />
            <DetailsList
                items={filteredRuns}
                columns={columns}
                setKey="set"
                layoutMode={DetailsListLayoutMode.fixedColumns} // Corrected here
                onRenderRow={undefined}
            />
            <div>
                <strong>Running: </strong>{runs.filter(run => run.status === 'running').length} 
                <strong> Queued: </strong>{runs.filter(run => run.status === 'queued').length}
            </div>
        </div>
    );
};

export default PipelineManager;
