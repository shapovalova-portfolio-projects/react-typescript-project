import { BaseSyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import localforage from 'localforage';

import { ProjectFiles } from '../../types';
import { FILES_KEY } from '../../constants';
import './index.css';

const reader = new FileReader();

export const MemoryLibrary = () => {
    const inputFile = useRef(null);
    const [selectedFileName, setSelectedFileName] = useState('');
    const [selectedFileContent, setSelectedFileContent] = useState('');
    const [newFileName, setNewFileName] = useState('');
    const [files, setFiles] = useState({} as ProjectFiles);

    useEffect(() => {
        localforage.getItem(FILES_KEY)
            .then((data) => setFiles(data as ProjectFiles))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        localforage.setItem(FILES_KEY, files);
    }, [files]);
 
    function updateFiles (file: File) {
        if (file) {
            try {
                setNewFileName(file.name);
                reader.readAsText(file);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const readerLoadEventHandler = useCallback(() => {
        if (newFileName) {
            const newFileContent = reader?.result as string;
            setFiles(files => ({ ...files, [newFileName]: newFileContent }));
            setNewFileName('');
        }
    }, [newFileName]);

    useEffect(() => {
        reader.addEventListener('loadend', readerLoadEventHandler, false);

        return () => {
            reader.removeEventListener('loadend', readerLoadEventHandler, false);
        };
    }, [readerLoadEventHandler]);

    const onOpenFileButtonClick = () => {
        if (inputFile?.current) {
            (inputFile.current as HTMLInputElement).click();
        }
    };
    const onSelectFileButtonClick = (fileKey: string) => () => {
        setSelectedFileName(fileKey);
        setSelectedFileContent(files[fileKey] || '');
    };
    const onChangeFile = (event: BaseSyntheticEvent) => {
        updateFiles(event?.target?.files?.[0]);
    }
    const onChangeContent = (event: BaseSyntheticEvent) => {
        setSelectedFileContent(event?.target?.value);
    }
    const onSaveContent = () => {
        const newFiles = { ...files, [selectedFileName]: selectedFileContent };
        setFiles(newFiles);
    }

    return (<div>
        <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={onChangeFile} />
        <button onClick={onOpenFileButtonClick}>Open file</button>
        <ul className='files-list'>
            {Object.keys(files || {}).map((fileKey: string) => {
                let className = 'file-name';
                if (selectedFileName === fileKey) {
                    className += ' active';
                }
                return (<li key={fileKey}>
                    <button onClick={onSelectFileButtonClick(fileKey)} className={className}>{fileKey}</button>
                </li>);
            })}
        </ul>
        {selectedFileName.length > 0 && <textarea value={selectedFileContent} onChange={onChangeContent} onBlur={onSaveContent} />}
    </div>);
};
