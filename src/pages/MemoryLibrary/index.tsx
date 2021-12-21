import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';

import { Files, ProjectFile } from '../../types';
import './index.css';

const reader = new FileReader();
const FILES_KEY = 'files';
function replacer(key: string, value: any) {
    // Filtering out properties
    if (value instanceof File) {
        const jsonObj: any = {};

        // Object.keys will list all 'enumerable' properties
        // First we look at all own properties of 'this'
        Object.keys(value).forEach((k: string) => {
            jsonObj[k] = (value as any)[k];
        });
        // Then we look at all own properties of this's 'prototype'
        Object.keys(Object.getPrototypeOf(value)).forEach(function(k: string) {
            jsonObj[k] = (value as any)[k];
        });
        return JSON.stringify(jsonObj)
    }
    return value;
}

export const MemoryLibrary = () => {
    const inputFile = useRef(null);
    const [selectedFileName, setSelectedFileName] = useState('');
    const [selectedFileContent, setSelectedFileContent] = useState('');

    const data = JSON.parse(localStorage.getItem(FILES_KEY) || '{}');
 
    function updateFiles (file: ProjectFile ) {
        const files = JSON.parse(localStorage.getItem(FILES_KEY) || '{}');
        const newFiles = (files || {}) as Files;
        if (!file) {
            return newFiles;
        }
        const fileName: string = file?.name || '';
        newFiles[fileName] = file;

        localStorage.setItem(FILES_KEY, JSON.stringify(newFiles, replacer));
    };

    useEffect(() => {
        const readerLoadEventHandler = () => {
            setSelectedFileContent(reader?.result as string);
        };
        reader.addEventListener('load', readerLoadEventHandler, false);

        return () => {
            reader.removeEventListener('load', readerLoadEventHandler, false);
        };
    }, []);
 
    useEffect(() => {
        if (selectedFileName.length < 1) {
            return;
        }

        try {
            reader.readAsText(JSON.parse((data as ProjectFile)?.[selectedFileName] as string));
        } catch (err) {
            setSelectedFileContent(`${selectedFileName}\n${err}`);
        }
    }, [selectedFileName, data]);

    const onButtonClick = () => {
        if (inputFile?.current) {
            (inputFile.current as HTMLInputElement).click();
        }
    };
    const onChangeFile = (event: BaseSyntheticEvent) => {
        event.stopPropagation();
        event.preventDefault();
        updateFiles(event?.target?.files?.[0]);
    }

    return (<div>
        <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={onChangeFile} />
        <button onClick={onButtonClick}>Open file</button>
        <ul className='files-list'>
            {Object.keys(data || {}).map((fileKey: string) => {
                let className = 'file-name';
                if (selectedFileName === fileKey) {
                    className += ' active';
                }
                return (<li key={fileKey}>
                    <button onClick={() => setSelectedFileName(fileKey)} className={className}>{fileKey}</button>
                </li>);
            })}
        </ul>
        {selectedFileName.length > 0 && <textarea defaultValue={selectedFileContent} />}
    </div>);
};