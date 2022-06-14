import React, { forwardRef, useState, useRef, useCallback, useEffect } from 'react';
import { postsSelector } from '@/reducers/slices/post';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImages, imageRemove } from '@/reducers/actions/post';
import backUrl from '../../config';


const Editor = forwardRef((props, ref) => {

    const dispatch = useDispatch();
    const { detail, detailloading, imagePaths, imagesDone } = useSelector(postsSelector);

    const [controlList, setControlList] = useState([
        {name: "B", style: "bold", isActive: false, icon: false},
        {name: "I", style: "italic", isActive: false, icon: false},
        {name: "U", style: "underline", isActive: false, icon: false},
        {name: "left", style: "justifyLeft", isActive: false, icon: true},
        {name: "center", style: "justifyCenter", isActive: false, icon: true},
        {name: "right", style: "justifyRight", isActive: false, icon: true},
    ]);

    const [files, setFiles] = useState(null);
    const control = useRef(null);
    
    const editorControl = useCallback((style, isActive) => {
        setControlList(list => list.map(item => item.style === style ? {...item, "isActive": !isActive} : item));
        setStyle(style, isActive);
    }, [])


    const linkAddControl = useCallback(() => {
        const link = prompt("Add Link");
        document.execCommand("createLink", false, link); 
    }, [])


    const setStyle = useCallback((style, isActive) => {
        if (isActive) {
            document.execCommand('RemoveFormat', false, style);
        } else {
            document.execCommand(style);
        }
        focusEditor();
    }, [])


    const codeAddControl = useCallback(() => {
        const selection = window.getSelection().toString();
        const wrappedselection = `<code class='code'>${selection}</code>`;
        const div = document.createElement('div');
        const br = document.createElement('br');
        document.execCommand('insertHTML', false, wrappedselection);
        div.append(br);
        ref.current.append(div);
    }, [])


    const editorAddImage = useCallback((e) => {
        const files = e.target.files;
        setFiles(files);
        
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f);
        });

        dispatch(uploadImages(imageFormData));
    }, [imagePaths])


    const focusEditor = () => {
        ref.current.focus({preventScroll: true});
    }

    useEffect(() => {
        if (imagesDone) {
            if (imagePaths.length > 0) {
                let file = files[0];
                if (!!files){
                    const reader = new FileReader();
                    reader.addEventListener('load', function (e) {
                        let img = imagePaths[0];
                        focusEditor();
                        document.execCommand('insertImage', false, `${backUrl}/${img}`);
                    });
                    reader.readAsDataURL(file);
                }
            }
        }
    }, [files, imagePaths, imagesDone])
    
    return (
        <div className='editor-form'>
            <div ref={control} className='control-wrap'>
                {controlList.map((item, index) => <button key={index} className={`${item.style} ${item.icon ? "icon" : ""} ${item.isActive ? "on" : ""}`} type="button" onClick={() => editorControl(item.style, item.isActive)}>{item.name}</button>)}
                <button type="button" className="icon link" onClick={linkAddControl}></button>
                <button type="button" onClick={codeAddControl}>{`</>`}</button>
                <label className="img-area" htmlFor="img-content"></label>
                <input
                    accept="image/*"
                    type="file"
                    id="img-content"
                    name="image"
                    multiple
                    onChange={editorAddImage}
                />

            </div>
            <div className='editor-content'>
                <div ref={ref} className='textarea' contentEditable='true'></div>
            </div>
        </div>
    )
})

export default Editor;