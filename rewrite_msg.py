import os
import sys

def rewrite_commit_message():
    commit_msg_file = sys.argv[1]
    with open(commit_msg_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace the word
    content = content.replace('Namolabs', 'Premium').replace('namolabs', 'premium')
    
    with open(commit_msg_file, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == '__main__':
    rewrite_commit_message()
