export function getLocalStorage() {
    try {
        const savedCart = localStorage.getItem("carts");
        return savedCart ? JSON.parse(savedCart) : []
    } catch (error) {
        console.error("Error Loading Cart From The Local Storage", error)
        return [];
    }
}
export function setLocalStorage(items) {
    try {
        localStorage.setItem("carts", JSON.stringify(items));
    } catch (error) {
        console.error("Failed To Load The Data From LocalStorage", error);
    }
}