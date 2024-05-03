function Editor() {
    return (
        <>
            <div>
                <input type="file" name="file" multiple />
                <input type="file" name="file" multiple />
                <br />
                <label htmlFor="text">Title</label>
                <input type="text" />
                <br />
                <label htmlFor="text">From Movie / Book Name</label>
                <input type="text" />
                <br />
                <label htmlFor="text">Ingredients</label>
                <input type="text" />
                <button>Add Ingredient</button>
                <br />
                <label htmlFor="text">Instructions</label>
                <input type="text" />
                <button>Add Instruction</button>
            </div>
        </>
    )
}

export default Editor