#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <arpa/inet.h>
#include <netinet/ip.h>
#include <netinet/tcp.h> // Or udp.h for UDP, or icmp.h for ICMP
#include <sys/socket.h>
#include <netinet/in.h>
#include <netinet/ip_icmp.h> // For ICMP (if needed)

int sd;
struct sockaddr_in sin;
char buffer[1024];  // You can change the buffer size

// Helper function to calculate the checksum
unsigned short checksum(void *b, int len) {
    unsigned short *buf = b;
    unsigned int sum = 0;
    unsigned short result;

    // Sum all 16-bit words
    for (sum = 0; len > 1; len -= 2) {
        sum += *buf++;
    }

    // Add the last byte, if any
    if (len == 1) {
        sum += *(unsigned char *)buf;
    }

    // Fold 32-bit sum to 16 bits and add carry
    sum = (sum >> 16) + (sum & 0xFFFF);
    sum += (sum >> 16);
    result = ~sum;

    return result;
}

int main() {
    struct iphdr *ip_header = (struct iphdr *)buffer;
    struct tcphdr *tcp_header = (struct tcphdr *)(buffer + sizeof(struct iphdr));

    // Step 1: Create a raw socket with IP protocol.
    sd = socket(AF_INET, SOCK_RAW, IPPROTO_RAW);
    if (sd < 0) {
        perror("socket() error");
        exit(-1);
    }

    // Step 2: Prepare sockaddr_in structure for destination address
    sin.sin_family = AF_INET;
    sin.sin_port = htons(80);  // Example: sending to port 80 (HTTP)
    sin.sin_addr.s_addr = inet_addr("192.168.1.1");  // Destination IP address (change as needed)

    // Step 3: Construct the IP header
    ip_header->ihl = 5;  // IP header length (5 * 4 bytes)
    ip_header->version = 4;  // IPv4
    ip_header->tos = 0;  // Type of service
    ip_header->tot_len = sizeof(struct iphdr) + sizeof(struct tcphdr);  // Total length
    ip_header->id = htonl(54321);  // ID field
    ip_header->frag_off = 0;  // Fragment offset
    ip_header->ttl = 255;  // Time to live
    ip_header->protocol = IPPROTO_TCP;  // Protocol type (TCP)
    ip_header->check = 0;  // Checksum (initially 0 to be computed later)
    ip_header->saddr = inet_addr("192.168.0.1");  // Source IP (change as needed)
    ip_header->daddr = sin.sin_addr.s_addr;  // Destination IP

    // Step 4: Compute IP checksum
    ip_header->check = checksum((unsigned short *)buffer, ip_header->tot_len);

    // Step 5: Construct the TCP header
    tcp_header->source = htons(12345);  // Source port (change as needed)
    tcp_header->dest = htons(80);  // Destination port
    tcp_header->seq = 0;  // Sequence number (adjust for real use)
    tcp_header->ack_seq = 0;  // Acknowledgment sequence (if needed)
    tcp_header->doff = 5;  // Data offset (header size)
    tcp_header->fin = 0;
    tcp_header->syn = 1;  // SYN flag (used in handshake)
    tcp_header->rst = 0;
    tcp_header->psh = 0;
    tcp_header->ack = 0;
    tcp_header->urg = 0;
    tcp_header->window = htons(5840); /* Maximum allowed window size */
    tcp_header->check = 0;  // Checksum (initially 0 to be computed later)
    tcp_header->urg_ptr = 0;

    // Step 6: Compute TCP checksum (pseudo header needed)
    tcp_header->check = checksum((unsigned short *)buffer, sizeof(struct iphdr) + sizeof(struct tcphdr));

    // Step 7: Send the packet using sendto
    int ip_len = ip_header->tot_len;
    if (sendto(sd, buffer, ip_len, 0, (struct sockaddr *)&sin, sizeof(sin)) < 0) {
        perror("sendto() error");
        exit(-1);
    }

    // Success
    printf("Packet sent successfully!\n");

    return 0;
}

