import sys

def edit_sequence():
    seq_file = sys.argv[1]
    with open(seq_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    for i, line in enumerate(lines):
        if line.startswith('pick 4f51787'):
            lines[i] = line.replace('pick', 'reword')
            
    with open(seq_file, 'w', encoding='utf-8') as f:
        f.writelines(lines)

if __name__ == '__main__':
    edit_sequence()
