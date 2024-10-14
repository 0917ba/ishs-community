import { createRef, useEffect } from "react";
import styles from '../BigbangPage.module.css';
import logoImage from '../../../assets/img/bigbang.png';
import { Link } from "react-router-dom";

const BNavbar = ({checked, setChecked, setBoardList}) => {

    const onChecked = (e) => {
        setChecked(e.target.checked);
        console.log(e.target.checked);
    }

    const search = (keyword, start, end) => {
        if (keyword === '') {
            fetch(`/post/list?start=${start}&end=${end}`).then((res) => {
                res.json().then((data) => {
                    setBoardList(data.content);
                });
            });
            return;
        }
        fetch(`/post/search/keyword?keyword=${keyword}&start=${start}&end=${end}`).then((res) => {
            res.json().then((data) => {
                setBoardList(data.content);
            });
        });
    };

    let ref1 = createRef();
    let ref2 = createRef();
    let ref3 = createRef();

    useEffect(() => {
        if (checked) {
            ref1.current.style.display = 'none';
            ref2.current.style.display = 'none';
            ref3.current.style.display = 'none';
        } else {
            ref1.current.style.display = 'block';
            ref2.current.style.display = 'block';
            ref3.current.style.display = 'block';
        }
    }, [checked]);

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            search(e.target.value, 0, 10000);
        }
    }

    return (
        <div>
            <nav className={styles.navbar}>
                <ul className={styles.logo}>
                    <Link to="/"><img className={styles.pagelogo} src={logoImage} alt="/" /></Link>
                </ul>
                <ul>
                    <div className={styles.search}>
                        {/* <svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#7792c1" viewBox="0 0 16 16"><g clipPath="url(#a)"><path fill="##s7792c1" d="M14 12.94 10.16 9.1c1.25-1.76 1.1-4.2-.48-5.78a4.49 4.49 0 0 0-6.36 0 4.49 4.49 0 0 0 0 6.36 4.486 4.486 0 0 0 5.78.48L12.94 14 14 12.94ZM4.38 8.62a3 3 0 0 1 0-4.24 3 3 0 0 1 4.24 0 3 3 0 0 1 0 4.24 3 3 0 0 1-4.24 0Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>
                        <input type="text" placeholder="Search..." onKeyDown={onKeyDown}/> */}
                    </div>
                </ul>
                <ul className={styles.menu}>
                    <input type="checkbox" id="menuicon" className={styles.menuicon} onChange={onChecked}/>
                    <label htmlFor="menuicon" className={styles.menubar}>
                        <div ref={ref1} className={styles.bar}></div>
                        <div ref={ref2} className={styles.bar}></div>
                        <div ref={ref3} className={styles.bar}></div>
                    </label>
                </ul>
            </nav>
        </div>
    );
}

export default BNavbar;