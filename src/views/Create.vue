<template>
    <div class="create container">
        <form @submit.prevent="handleCreatePost" action="">
            <label for="">Title</label>
            <input required v-model="title" type="text">
            <label for="">Description</label>
            <textarea required v-model="description"></textarea>
            <label for="">Tags</label>
            <div class="form__wrapper">
                <input @keydown.prevent.enter="handleAddTag" type="text" v-model="tmpTag">
                <button type="button" @click="handleAddTag">create tag</button>
            </div>
            <div class="wrapper__pill">
                <div class="pill" v-for="tag in tags" :key="tag">
                    <span @click="handleDelete(tag)">#{{tag}}</span>
                </div>
            </div>
            <label for="">Picture for your post</label>
            <div class="form__wrapper">
                <input class="imgInput" required type="file" @change="handleChangeImage">
            </div>
            <button v-if="!isPending" class="form__submitBtn" type="submit">create</button>
            <button v-else class="form__submitBtn" disabled>creating post...</button>
        </form>
    </div>
</template>

<script>

    import {ref, reactive} from "@vue/reactivity"
    import {useRouter} from "vue-router"
    import {usePost} from "@/composables/usePost";
    import {useStorage} from "@/composables/useStorage";

    export default {
        setup() {
            const router = useRouter()

            let tags = ref([])
            let title = ref('')
            let description = ref('')
            let tmpTag = ref('')
            const image = ref(null)
            const isPending = ref(false)

            const {createPost} = usePost()
            const {uploadImage} = useStorage()

            const handleAddTag = () => {
                tmpTag.value = tmpTag.value.slice(0, 25)
                if (!tmpTag.value.length || tags.value.includes(tmpTag.value.toLowerCase())) null
                else tags.value.push(tmpTag.value.toLowerCase())
                tmpTag.value = ''
            }
            const handleDelete = (value) => {
                tags.value = tags.value.filter(tag => tag !== value)
            }
            const handleChangeImage = (event) => {
                const selectedFile = event.target.files[0]
                if (selectedFile && selectedFile.type.includes("image")) {
                    image.value = selectedFile
                    console.log(image.value)
                    return
                } else alert('invalid img')
            }
            const handleCreatePost = async () => {
                isPending.value = true
                const imgUrl = await uploadImage('posts', image.value)
                const newPost = {
                    title: title.value,
                    tags: tags.value,
                    description: description.value,
                    imgUrl
                }
                await createPost(newPost)
                isPending.value = false
                router.push("/")
                console.log(newPost)
            }

            return {
                tags,
                tmpTag,
                title,
                description,
                isPending,
                handleAddTag,
                handleDelete,
                handleCreatePost,
                handleChangeImage
            }
        }
    }
</script>

<style lang="scss" scoped>
    span {
        cursor: pointer;
        margin-right: 10px;
    }

    input, textarea {
        display: block;
        margin: 10px 0;
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
        border: 1px solid #2c3e50;
    }

    label {
        display: inline-block;
        margin-top: 30px;
        position: relative;
        font-size: 20px;
        color: #fff;
        margin-bottom: 10px;
        padding: 2px 0;
    }

    label::before {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        background: #2c3e50;
        position: absolute;
        top: 0;
        z-index: -1;
        padding-right: 40px;
        left: -10px;
        transform: rotateZ(-2deg);
    }

    button {
        display: block;
        margin-top: 20px;
        background: #2c3e50;
        color: #fff;
        border: none;
        padding: 6px 16px;
        font-size: 18px;
        cursor: pointer;
        border-radius: 3px;
    }

    .pill {
        display: inline-block;
        margin: 10px 10px 0 0;
        color: #444;
        background: #ddd;
        padding: 8px;
        border-radius: 20px;
        font-size: 14px;
    }

    textarea {
        min-height: 100px;
        max-height: 250px;
        resize: vertical;
    }

    .form__submitBtn {
        margin: 35px 0;

        &:disabled {
            opacity: .3;
        }
    }

    .form__wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }

    .form__wrapper button {
        background: inherit;
        color: #2c3e50;
        height: 100%;
        position: absolute;
        right: 0;
        bottom: 0;
    }

    .form__wrapper input {
        padding-right: 30%;
    }

    .imgInput {
        width: 200px;
    }

    @media (max-width: 554px) {
        .form__wrapper button {
            padding: 10px;
            font-size: 13px;
        }
    }
</style>