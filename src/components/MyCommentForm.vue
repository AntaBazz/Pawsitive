<template>

  <div id="commenti" class="container">
    <div class="text-center mb-4">
      <h2>Comments</h2>
    </div>
    <div class="comment-section">
      <!-- New Comment Form -->
      <div class="mb-4">
        <div class="d-flex gap-3">
          <div class="user-avatar-icon">
            <i class="fa-solid fa-user"></i>
          </div>
          <div class="flex-grow-1">
            <!-- Name Input -->
            <input v-model="userName" type="text" class="form-control name-input mb-2" placeholder="Your name"
              maxlength="50" />
            <!-- Comment Input -->
            <textarea v-model="newComment" class="form-control comment-input" rows="3"
              placeholder="Write a comment..."></textarea>
            <div class="mt-3 text-end">
              <button class="btn btn-warning text-white btn-sm mt-3 rounded-pill" @click="addComment"
                style="padding-left: 1.5rem; padding-right: 1.5rem;">
                Post comment
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Comments List -->
      <div class="comments-list">
        <div v-for="(comment, index) in visibleComments" :key="comment.id" class="comment-box">
          <div class="d-flex gap-3">
            <div class="user-avatar-icon">
              <i class="fa-solid fa-user"></i>
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h6 class="mb-0">{{ comment.name }}</h6>
                <span class="comment-time">{{ formatTime(comment.createdAt) }}</span>
              </div>
              <p class="mb-2">{{ comment.text }}</p>
              <div class="comment-actions">
                <a href="#" @click.prevent="toggleReply(index)">
                  <i class="fa-solid fa-reply"></i> Reply
                </a>
              </div>

              <!-- Reply Input -->
              <div v-if="comment.showReplyBox" class="mt-3">
                <textarea v-model="comment.replyText" class="form-control comment-input mb-2" rows="2"
                  placeholder="Write a reply..."></textarea>
                <div class="text-end">
                  <button class="btn btn-warning text-white btn-sm mt-3 rounded-pill" @click="postReply(index)" style="padding-left: 1.5rem; padding-right: 1.5rem;">
                    Post Reply
                  </button>
                </div>
              </div>

              <!-- Replies -->
              <div class="reply-section mt-3" v-if="comment.replies?.length">
                <div v-for="(reply, rIdx) in comment.replies" :key="rIdx" class="comment-box">
                  <div class="d-flex gap-3">
                    <div class="user-avatar-icon">
                      <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="flex-grow-1">
                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <h6 class="mb-0">{{ reply.name }}</h6>
                        <span class="comment-time">{{ formatTime(reply.createdAt) }}</span>
                      </div>
                      <p class="mb-2">{{ reply.text }}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- Show More Button -->
      <div v-if="comments.length > commentsToShow" class="text-center mt-3">

        <button class="btn btn-warning text-white btn-sm mt-3 rounded-pill" @click="showMoreComments"
          style="padding-left: 1.5rem; padding-right: 1.5rem;">
          Show more comments
        </button>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { db } from '@/firebase'
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp,
  orderBy,
  query
} from 'firebase/firestore'

const userName = ref('')
const newComment = ref('')
const comments = ref([])

const commentsRef = collection(db, 'comments')

const commentsToShow = ref(5)

// Computed: solo i commenti visibili
const visibleComments = computed(() => comments.value.slice(0, commentsToShow.value))

// Load comments from Firestore
const loadComments = async () => {
  const q = query(commentsRef, orderBy('createdAt', 'desc'))
  const querySnapshot = await getDocs(q)
  comments.value = querySnapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
    showReplyBox: false,
    replyText: ''
  }))
}

// Add new comment
const addComment = async () => {
  if (userName.value.trim() === '' || newComment.value.trim() === '') return

  await addDoc(commentsRef, {
    name: userName.value.trim(),
    text: newComment.value.trim(),
    createdAt: serverTimestamp(),
    replies: []
  })

  userName.value = ''
  newComment.value = ''
  commentsToShow.value = 5 // resetta paginazione a 5 commenti visibili
  loadComments()
}

// Toggle reply input
const toggleReply = (index) => {
  comments.value[index].showReplyBox = !comments.value[index].showReplyBox
}

// Post reply
const postReply = async (index) => {
  const replyText = comments.value[index].replyText?.trim()
  if (!replyText) return

  const commentDocRef = doc(db, 'comments', comments.value[index].id)
  const currentReplies = comments.value[index].replies || []

  const newReply = {
    name: userName.value.trim() || 'You',
    text: replyText,
    createdAt: new Date()
  }

  const updatedReplies = [...currentReplies, newReply]

  await updateDoc(commentDocRef, {
    replies: updatedReplies
  })

  comments.value[index].replyText = ''
  comments.value[index].showReplyBox = false
  loadComments()
}

// Format time
const formatTime = (timestamp) => {
  if (!timestamp) return 'Just now'
  const date = timestamp.toDate ? timestamp.toDate() : timestamp
  return date.toLocaleString()
}

// Show more comments button handler
const showMoreComments = () => {
  commentsToShow.value += 5
}

onMounted(() => {
  loadComments()
})
</script>

<style scoped>
.comment-section {
  max-width: 800px;
  margin: 2rem auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 15px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.comment-box {
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.2s;
  border: 1px solid #e9ecef;
}

.comment-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.user-avatar-icon {
  width: 50px;
  height: 50px;
  min-width: 50px;
  border-radius: 50%;
  background: #dee2e6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #6c757d;
}

.name-input {
  border-radius: 20px;
  padding: 10px 20px;
  border: 2px solid #e9ecef;
  transition: all 0.3s;
  width: 100%;
}

.name-input:focus {
  box-shadow: none;
  border-color: #86b7fe;
}

.comment-input {
  border-radius: 20px;
  padding: 15px 20px;
  border: 2px solid #e9ecef;
  transition: all 0.3s;
  width: 100%;
}

.comment-input:focus {
  box-shadow: none;
  border-color: #86b7fe;
}

.btn-comment {
  border-radius: 20px;
  padding: 8px 25px;
  background: #0d6efd;
  border: none;
  transition: all 0.3s;
}

.btn-comment:hover {
  background: #0b5ed7;
  transform: translateY(-1px);
}

.comment-actions {
  font-size: 0.9rem;
}

.comment-actions a {
  color: #6c757d;
  text-decoration: none;
  margin-right: 15px;
  transition: color 0.2s;
  cursor: pointer;
}

.comment-actions a:hover {
  color: #ffc107;
}

.comment-time {
  color: #adb5bd;
  font-size: 0.85rem;
}

.reply-section {
  margin-left: 60px;
  border-left: 2px solid #e9ecef;
  padding-left: 20px;
}

.text-center {
  text-align: center;
}


/* Previene l'overflow del nome */
.comment-box h6,
.comment-box p,
.name-input,
.comment-input {
  word-break: break-word;
  overflow-wrap: break-word;
}
</style>
