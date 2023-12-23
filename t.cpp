//Standard Header Files
#include<bits/stdc++.h>
using namespace std;
using lli = long long;

#define IOS ios_base::sync_with_stdio(0);cin.tie(0);cout.tie(0);
#define endl "\n"
#define all(a) (a).begin(), (a).end()

const lli mod = 1e9+7;

vector<int> func(string &R,vector<int> &vec){
    int A = 0,B = 0;
    int Am=INT_MAX,Bm=INT_MAX;
    int n = R.size();
    for(int i=0;i<n;i++){
        if(R[i] == 'A'){
            A += vec[i];
            B -= vec[i];
        }
        else{
            A -= vec[i];
            B += vec[i];
        } 
        Am = min(A,Am);
        Bm = min(B,Bm);
    }

    return {abs(min(0,Am)),abs(min(0,Bm))};
}

void solve()
{
    int n;
    cin>>n;
    string R;
    cin>>R;

    vector<int> vec(n,0);
    for(auto &it:vec){
        cin>>it;
    }

    vector<int> ans = func(R,vec);
    cout<<ans[0]<<" "<<ans[1]<<endl;
}

signed main(){
    IOS
    solve();
    return 0;
}