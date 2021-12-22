import { BaseSyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { filesState, fileState } from '../../recoil';
import './index.css';
import { ProjectFiles } from '../../types';

const reader = new FileReader();

export const MemoryLibrary = () => {
    const inputFile = useRef(null);
    const [selectedFileName, setSelectedFileName] = useState('');
    const [selectedFileContent, setSelectedFileContent] = useState('');
    const [newFileName, setNewFileName] = useState('');
    const [files, setFiles] = useRecoilState(filesState);
    console.log(useRecoilValue(fileState(selectedFileName)))

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
    }, [newFileName, setFiles]);

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
        setSelectedFileContent((files as ProjectFiles)[fileKey] || '');
    };
    const onChangeFile = (event: BaseSyntheticEvent) => {
        event.stopPropagation();
        event.preventDefault();
        updateFiles(event?.target?.files?.[0]);
    }
    const onChangeContent = (event: BaseSyntheticEvent) => {
        setSelectedFileContent(event.target.value);
    }
    const onSaveContent = (event: BaseSyntheticEvent) => {
        event.stopPropagation();
        event.preventDefault();
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
