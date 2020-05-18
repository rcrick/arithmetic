class LRUCache<K, V> {
    private cacheMap: Map<K, ListNode<K, V>>;
    private readonly limit: number;
    private head: ListNode<K, V> | null = null;
    private end: ListNode<K, V> | null = null;
    constructor(limit: number) {
        if(limit <= 0) throw new Error('limit of cache must > 0');
        this.cacheMap = new Map();
        this.limit = limit;
    }

    public get(key: K): V|null {
        const node = this.cacheMap.get(key);
        if(!node) return null;
        this.refreshNode(node);
        return node.value;
    }

    public set(key: K, value: V) {
        const node = this.cacheMap.get(key);
        if(!node) {
            if(this.cacheMap.size >= this.limit) {
                this.removeNode(this.end!)
                this.cacheMap.delete(key);
            }
            const newNode = new ListNode(key, value);
            this.addNode(newNode);
            this.cacheMap.set(key, newNode);
        } else {
            node.value = value;
            this.refreshNode(node);
        }
    }

    public removeNode(node: ListNode<K, V>) {
        if(this.end == node) {
            this.end = this.end.pre;
        } else if (this.head == node) {
            this.head = this.head.next;
        } else {
            node.pre!.next = node.next;
            node.next!.pre = node.pre
        }
    }

    private addNode(node: ListNode<K, V>) {
        if(this.head == null) {
            this.end = node;
            node.next = null;
            node.pre = null;
        } else {
            node.next = this.head;
            this.head.pre = node;
        }
        this.head = node;
    }

    private refreshNode(node: ListNode<K, V>) {
        if(this.head == node) return;
        this.removeNode(node);
        this.addNode(node);
    }
}


class ListNode<K, V> {
    key: K;
    value: V;
    next: ListNode<K, V> | null;
    pre: ListNode<K, V> | null;
    constructor(
        key: K,
        value: V,
        next: ListNode<K, V> | null = null,
        pre: ListNode<K, V> | null = null
    ) {
        this.key = key;
        this.value = value;
        this.next = next;
        this.pre  = pre;
    }
}

const cache = new LRUCache<string,string>(5)
cache.set('lv1','xzw')
cache.set('lv2','xzw2')
cache.set('lv3','xzw3')
cache.set('lv4','xzw4')
cache.set('lv5','xzw5')
cache.get('lv1')
console.log(cache)