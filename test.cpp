#include<bits/stdc++.h>
using namespace std;

struct Node {
    vector<Node*> subtrees;
    Node(vector<Node*> subtrees) : subtrees(subtrees) {}
};

struct Result {
    int size;
    bool isBalanced;
};

int ans;

Result countSubtreeSize(Node* root) {
    if (!root) {
        return {0, true};
    }

    int size = 1;
    bool isBalanced = true;
    set<int> st;

    for (Node* child : root->subtrees) {
        Result childResult = countSubtreeSize(child);
        size += childResult.size;

        st.insert(childResult.size);
    }

    if(st.size() > 1) isBalanced = false;
    ans += isBalanced;

    return {size, isBalanced};
}

int countBalancedNodes(Node* tree) {
    vector<Node*> vec;
    vec.push_back(tree);
    Node* rootN = new Node(vec);
    ans = 0;
    if (!tree) return 0;
    Result rootResult = countSubtreeSize(rootN);
    return ans;
}

int main() {
    Node* root = new Node({
        new Node({}),
        new Node({}),
        new Node({
            new Node({}),
            new Node({}),
            new Node({})
        })
    });

    int result = countBalancedNodes(root);

    cout << "Number of balanced nodes: " << result << endl;

    return 0;
}
