#include <pcap.h>
#include <stdio.h>
#include <stdlib.h>
#include <netinet/ip.h>    // for struct ip
#include <netinet/icmp6.h> // for ICMPv6
#include <netinet/if_ether.h>  // for ethernet header
#include <arpa/inet.h>      // for inet_ntoa() and inet_pton()

/* This function will be invoked by pcap for each captured packet.
   We can process each packet inside the function. */
void got_packet(u_char *args, const struct pcap_pkthdr *header, const u_char *packet)
{
    // Ethernet header
    struct ether_header *eth_header = (struct ether_header *) packet;

    // Check if it's an IP packet (Ethernet II Type = 0x0800)
    if (ntohs(eth_header->ether_type) == ETHERTYPE_IP) {
        struct ip *ip_header = (struct ip *)(packet + sizeof(struct ether_header));

        // Get source and destination IP addresses
        char src_ip[INET_ADDRSTRLEN];
        char dst_ip[INET_ADDRSTRLEN];
        inet_ntop(AF_INET, &ip_header->ip_src, src_ip, INET_ADDRSTRLEN);
        inet_ntop(AF_INET, &ip_header->ip_dst, dst_ip, INET_ADDRSTRLEN);

        // Print packet details
        printf("Captured packet:\n");
        printf("Source IP: %s\n", src_ip);
        printf("Destination IP: %s\n", dst_ip);

        // Check if the packet is ICMP (Internet Control Message Protocol)
        if (ip_header->ip_p == IPPROTO_ICMP) {
            struct icmp *icmp_header = (struct icmp *)(packet + sizeof(struct ether_header) + sizeof(struct ip));
            printf("ICMP Packet\n");
            printf("ICMP Type: %d\n", icmp_header->icmp_type);
            printf("ICMP Code: %d\n", icmp_header->icmp_code);
        }
        printf("---------------------------------------------------------\n");
    }
}

/* Main function to open the live capture and capture packets */
int main()
{
    pcap_t *handle;
    char errbuf[PCAP_ERRBUF_SIZE];
    struct bpf_program fp;
    char filter_exp[] = "icmp";  // Filter expression to capture only ICMP packets
    bpf_u_int32 net;

    // Step 1: Open live pcap session on NIC with name eth3.
    // Students need to change "eth3" to the name found on their own
    // machines (using ifconfig). The interface to the 10.9.0.0/24
    // network has a prefix "br-" (if the container setup is used).
    handle = pcap_open_live("eth3", BUFSIZ, 1, 1000, errbuf);
    if (handle == NULL) {
        fprintf(stderr, "Could not open device eth3: %s\n", errbuf);
        exit(EXIT_FAILURE);
    }

    // Step 2: Compile filter_exp into BPF psuedo-code
    if (pcap_compile(handle, &fp, filter_exp, 0, net) == -1) {
        fprintf(stderr, "Could not parse filter %s: %s\n", filter_exp, pcap_geterr(handle));
        exit(EXIT_FAILURE);
    }

    // Set the filter
    if (pcap_setfilter(handle, &fp) == -1) {
        fprintf(stderr, "Could not install filter %s: %s\n", filter_exp, pcap_geterr(handle));
        exit(EXIT_FAILURE);
    }

    // Step 3: Capture packets
    printf("Starting packet capture...\n");
    pcap_loop(handle, -1, got_packet, NULL);  // -1 means infinite loop

    // Close the pcap session after capturing packets
    pcap_close(handle);
    return 0;
}

// Note: don't forget to add "-lpcap" to the compilation command
// For example: gcc -o sniff sniff.c -lpcap

