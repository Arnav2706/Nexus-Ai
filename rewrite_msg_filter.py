import sys
content = sys.stdin.read()
content = content.replace('Namolabs', 'Premium').replace('namolabs', 'premium')
sys.stdout.write(content)
